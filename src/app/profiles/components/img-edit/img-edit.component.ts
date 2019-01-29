import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProfilesProjections} from '../../profiles.projections';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProfilesCommands} from '../../profiles.commands';
import {Subject, Subscription} from 'rxjs';
import {FormResponse} from '../../../shared/components/form-ui/form-ui.component';
import {AppService} from '../../../main/app.service';
import {newProfile, Profile} from '../../profile.model';

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
  formRes: Subject<FormResponse> = new Subject<FormResponse>();
  @ViewChild('uploader') uploader;

  constructor(private profilesProj: ProfilesProjections,
              private profilesCommands: ProfilesCommands,
              private appService: AppService,
              private ref: ChangeDetectorRef,
              private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    console.log('ImgEditComponent');

    if (this.router.getCurrentNavigation()) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation.extras.state as { profileId: string };
      this.profileId = state.profileId;
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
      if (this.profileId) {
        this.profile = newProfile({id: this.profileId});
      }
    }

  }

  urlChange(url) {
    if (this.profileId) {
      this.profile = {...this.profile, pic: url};
      this.profilesCommands.update({id: this.profileId, pic: url})
        .subscribe(this.onSuccess, this.onError);
    }
  }

  onDelete() {
    // this.profilesCommands.delete(this.profileId)
    //   .subscribe(this.onSuccess, this.onError);
  }

  onSuccess = (res) => {
    this.formRes.next({
      isPending: false,
      successMsg: 'Success'
    });
  };

  onError = (err) => {
    this.formRes.next({
      isPending: false,
      errorMsg: 'Error'
    });
  };

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}



