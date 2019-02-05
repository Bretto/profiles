import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfilesProjections} from '../../profiles.projections';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ProfilesCommands} from '../../profiles.commands';
import {Subject, Subscription} from 'rxjs';
import {FormResponse} from '../../../shared/components/form-ui/form-ui.component';
import {newProfile, Profile} from '../../profile.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-img-edit',
  templateUrl: './img-edit.component.html',
  styleUrls: ['./img-edit.component.scss']
})
export class ImgEditComponent implements OnInit, OnDestroy {


  subs: Subscription = new Subscription();
  profile: Profile;
  profileId: string;
  form: FormGroup;
  formDataOrigin: any = {};
  uploading: boolean;
  formRes: Subject<FormResponse> = new Subject<FormResponse>();


  constructor(private profilesProj: ProfilesProjections,
              private profilesCommands: ProfilesCommands,
              private router: Router,
              private route: ActivatedRoute) {

    console.log('ImgEditComponent');
    const navigation = this.router.getCurrentNavigation();

    if (_.get(navigation, 'extras.state.profileId')) {
      this.profileId = _.get(navigation, 'extras.state.profileId');
    } else {
      this.profileId = route.snapshot.paramMap.get('id');
    }

  }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('id')) {
      this.subs.add(
        this.profilesProj.queryById$(this.profileId)
          .subscribe(profile => {
            this.formDataOrigin = profile;
            this.profile = profile;
          }));
      this.profilesCommands.queryById(this.profileId);
    } else {
      this.profile = newProfile({id: this.profileId});
    }

  }

  urlChange(url) {

    this.profile = {...this.profile, pic: url};
    // this.profilesCommands.update({id: this.profileId, pic: url})
    //   .subscribe(this.onSuccess, this.onError);

    this.uploading = false;
    this.formRes.next({
      isPending: false,
      successMsg: 'Success'
    });

  }

  onDelete() {
    // this.profilesCommands.delete(this.profileId)
    //   .subscribe(this.onSuccess, this.onError);
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



