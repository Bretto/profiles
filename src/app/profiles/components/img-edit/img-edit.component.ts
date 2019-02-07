import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProfilesProjections} from '../../profiles.projections';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfilesCommands} from '../../profiles.commands';
import {Subject, Subscription} from 'rxjs';
import {FormResponse} from '../../../shared/components/form-ui/form-ui.component';
import {newProfile, IProfile} from '../../profile.model';
import * as _ from 'lodash';
import {filter, first} from 'rxjs/operators';
import {AngularFirestore} from 'angularfire2/firestore';
import {UiProjection} from '../../../ui/ui.projections';

@Component({
  selector: 'app-img-edit',
  templateUrl: './img-edit.component.html',
  styleUrls: ['./img-edit.component.scss']
})
export class ImgEditComponent implements OnInit, OnDestroy {


  subs: Subscription = new Subscription();
  profile: IProfile;
  profileId: string;
  picSourceOrigin: any = {};
  uploadPath: string;

  formRes: Subject<FormResponse> = new Subject<FormResponse>();

  _uploading: boolean;
  get uploading(): boolean {
    return this._uploading;
  }

  @Input() set uploading(value: boolean) {
    if (!this._uploading && value) {
      this.addUploadCompleteListener();
    }
    this._uploading = value;
  }

  constructor(private profilesProj: ProfilesProjections,
              private uiProj: UiProjection,
              private profilesCommands: ProfilesCommands,
              public db: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute) {

    console.log('ImgEditComponent');
    const navigation = this.router.getCurrentNavigation();

    if (_.get(navigation, 'extras.state.profileId')) {
      this.profileId = _.get(navigation, 'extras.state.profileId');
    } else {
      this.profileId = route.snapshot.paramMap.get('id');
    }
    this.uploadPath = `${uiProj.getUser().uid}/${this.profileId}`;
  }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('id')) {
      this.subs.add(
        this.profilesProj.queryById$(this.profileId)
          .pipe(first())
          .subscribe((profile: IProfile) => {
            this.picSourceOrigin = profile.pic.source;
            this.profile = profile;
          }));
      this.profilesCommands.queryById(this.profileId);
    } else {
      this.profile = newProfile({id: this.profileId});
      this.picSourceOrigin = this.profile.pic.source;
    }

  }

  addUploadCompleteListener() {
    this.subs.add(
      this.db.doc(`profile/${this.profile.id}`)
        .valueChanges().pipe(
        filter((p: IProfile) => p.pic.source !== this.picSourceOrigin),
        first()
      ).subscribe(this.onSuccess, this.onError));
  }

  onSuccess = (res) => {
    this.uploading = false;
    this.formRes.next({
      isPending: false,
      successMsg: 'Success'
    });
  };

  onError = (err) => {
    this.uploading = false;
    this.formRes.next({
      isPending: false,
      errorMsg: 'Error'
    });
  };

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}



