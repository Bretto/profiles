import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProfilesProjections} from '../../profiles.projections';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfilesCommands} from '../../profiles.commands';
import {Subject, Subscription} from 'rxjs';
import {FormResponse} from '../../../shared/components/form-ui/form-ui.component';
import {AppService} from '../../../main/app.service';
import {getUID} from '../../../shared/utils';
import {newProfile, Profile} from '../../profile.model';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  hasChanges: boolean;
  subs: Subscription = new Subscription();
  profile: Profile;
  profileId: string;
  imgLoaded: boolean;
  createMode: boolean;
  form: FormGroup;
  formDataOrigin: any = {};
  formRes: Subject<FormResponse> = new Subject<FormResponse>();
  @ViewChild('uploader') uploader;

  constructor(private profilesProj: ProfilesProjections,
              private profilesCommands: ProfilesCommands,
              private appService: AppService,
              private ref: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute,
              private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    console.log('ProfileEditComponent');

    this.initForm();

    if (route.snapshot.paramMap.get('id')) {
      this.profileId = route.snapshot.paramMap.get('id');
      this.subs.add(
        this.profilesProj.queryById$(this.profileId)
          .subscribe(profile => {
            this.formDataOrigin = profile;
            this.form.patchValue(profile);
            this.profile = profile;
          }));

      this.profilesCommands.queryById(this.profileId);
    } else {
      this.createMode = true;
      this.profileId = getUID('profile');
      this.profile = newProfile({id: this.profileId});
      this.formDataOrigin = this.profile;
      this.form.patchValue(this.profile);
    }
  }

  ngOnInit() {

  }

  initForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      bio: ['', [Validators.required]],
    });
  }

  onImgLoaded() {
    this.imgLoaded = true;
  }

  onCancel() {
    this.form.patchValue(this.formDataOrigin);
  }

  onDelete() {
    this.profilesCommands.delete(this.profileId)
      .subscribe(this.onSuccess, this.onError);
  }

  onSubmit() {
    this.formRes.next({isPending: true});
    const profile = {id: this.profileId, ...this.form.getRawValue()};

    if (this.createMode) {
      this.profilesCommands.create(profile)
        .subscribe(this.onSuccess, this.onError);
    } else {
      this.profilesCommands.update(profile)
        .subscribe(this.onSuccess, this.onError);
    }
  }

  resetForm() {
    this.form.reset();
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


  get fullName() {
    const firstName = this.formDataOrigin.firstName ? this.formDataOrigin.firstName : this.form.get('firstName').value;
    const lastName = this.formDataOrigin.lastName ? this.formDataOrigin.lastName : this.form.get('lastName').value;
    return `${firstName}  ${lastName}`;
  }

  get headerIsVisible() {
    if (this.appService) {
      return this.appService.headerIsVisible;
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onRemoveFile(data) {
    this.uploader.removeFile(data);
  }

  getFC(name) {
    return this.form.get(name);
  }

  onEditImg(profile) {
    this.router.navigate(['img'], {relativeTo: this.activatedRoute, state: {profileId: this.profileId}});
  }

  formData() {
    const {firstName, lastName, bio} = this.form.getRawValue();
    return {firstName, lastName, bio};
  }

  originData() {
    const {firstName, lastName, bio} = this.formDataOrigin;
    return {firstName, lastName, bio};
  }

  checkForChanges() {
    console.log('checkForChanges', this.formData() === this.originData());
    return this.formData() === this.originData();
  }

}

