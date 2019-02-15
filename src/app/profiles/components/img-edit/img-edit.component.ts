import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProfilesProjections} from '../../profiles.projections';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfilesCommands} from '../../profiles.commands';
import {Subscription} from 'rxjs';
import {newProfile, IProfile} from '../../profile.model';
import * as _ from 'lodash';
import {filter, first, tap} from 'rxjs/operators';
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

  _uploading: boolean;
  get uploading(): boolean {
    return this._uploading;
  }

  @Input() set uploading(value: boolean) {
    if (!this._uploading && value) {
      this.picSourceOrigin = this.profile.pic.source;
      this.addUploadCompleteListener();
    }
    this._uploading = value;
  }

  constructor(private profilesProj: ProfilesProjections,
              private uiProj: UiProjection,
              private activatedRoute: ActivatedRoute,
              private profilesCommands: ProfilesCommands,
              public db: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute) {

    console.log('ImgEditComponent');

    this.profileId = route.snapshot.paramMap.get('id');
    this.uploadPath = `${uiProj.getState<User>(['user', 'auth']).uid}/${this.profileId}`;
  }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('id')) {
      this.subs.add(
        this.profilesProj.queryById$(this.profileId)
          .subscribe((profile: IProfile) => {
            this.profile = profile;
          }));
      this.profilesCommands.queryById(this.profileId);
    } else {
      this.profile = newProfile({id: this.profileId});
    }

  }

  addUploadCompleteListener() {
    console.log('addUploadCompleteListener');
    this.subs.add(
      this.db.doc(`profile/${this.profile.id}`)
        .valueChanges().pipe(
        filter((p: IProfile) => p.pic.source !== this.picSourceOrigin),
        first()
      ).subscribe(this.onSuccess, this.onError));
  }

  onSuccess = (res) => {

    // const profile = {...this.profile, pic }
    //
    // if (this.createMode) {
    //   this.profilesCommands.create(profile)
    //     .subscribe(this.onSuccess, this.onError);
    // } else {
    //   this.profilesCommands.update(profile)
    //     .subscribe(this.onSuccess, this.onError);
    // }

    this.uploading = false;
  };

  onError = (err) => {
    this.uploading = false;
  };

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}





