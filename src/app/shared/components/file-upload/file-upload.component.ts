import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {AngularFirestore} from 'angularfire2/firestore';
import {finalize, first} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {UiProjection} from '../../../ui/ui.projections';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnDestroy {

  @Input() profileId: string;

  subs = new Subscription();

  @ViewChild('uploader') uploader;
  // Main task
  task: AngularFireUploadTask;
  snap: any;
  percentage: number;

  // Download URL
  downloadURL: string;

  uploadingValue = false;
  @Output() uploadingChange = new EventEmitter();

  @Input()
  get uploading() {
    return this.uploadingValue;
  }

  set uploading(val) {
    this.uploadingValue = val;
    this.uploadingChange.emit(this.uploadingValue);
  }

  user: User;

  @Output() url: EventEmitter<string> = new EventEmitter();

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private uiProj: UiProjection) {

    uiProj.getUser()
      .pipe(first())
      .subscribe(user => {
        this.user = user;
      });
  }

  startUpload(event: FileList) {

    this.uploading = true;
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `${this.user.uid}/${this.profileId}/${new Date().getTime()}_${file.name}`;

    const fileRef = this.storage.ref(path);
    // The main task
    this.task = this.storage.upload(path, file);

    // Progress monitoring
    this.subs.add(this.task.percentageChanges().subscribe(percentage => {
      this.percentage = percentage;
      if (percentage === 100) {
        setTimeout(_ => this.snap = null, 0);
      }
    }));

    this.subs.add(this.task.snapshotChanges().subscribe(snap => {
      this.snap = snap;
      // this.uploading = snap.state === 'running' && snap.bytesTransferred < snap.totalBytes;
    }));

    // TODO fix this ugliness
    this.subs.add(this.task.snapshotChanges().pipe(
      finalize(() => {
        this.subs.add(fileRef.getDownloadURL()
          .subscribe(url => {
            this.downloadURL = url;
            this.url.emit(url);
          }));
      })
    ).subscribe());

  }

  onCancel() {
    this.task.cancel();
    this.snap = null;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onBrowseFiles() {
    this.uploader.nativeElement.click();
  }

}
