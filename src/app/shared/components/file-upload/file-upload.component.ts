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

  @Input() path: string;

  subs = new Subscription();

  @ViewChild('uploader') uploader;
  task: AngularFireUploadTask;
  snap: any;
  percentage: number;

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

  constructor(private storage: AngularFireStorage) {

  }

  startUpload(event: FileList) {

    this.uploading = true;
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path =  `${this.path}/${new Date().getTime()}_${file.name}`;
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
    }));
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
