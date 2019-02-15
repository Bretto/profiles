import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {FormResponse} from '../../../shared/components/form-ui/form-ui.component';
import {IProfile} from '../../profile.model';
import * as _ from 'lodash';
import {ProfilesProjections} from '../../store/profiles.projections';
import {ProfilesCommands} from '../../store/profiles.commands';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  profile: IProfile;
  profileId: string;
  form: FormGroup;
  formDataOrigin: any = {};
  formRes: Subject<FormResponse> = new Subject<FormResponse>();

  constructor(private profilesProj: ProfilesProjections,
              private profilesCommands: ProfilesCommands,
              private activatedRoute: ActivatedRoute,
              private router: Router, private fb: FormBuilder) {

    console.log('ProfileEditComponent');


  }

  ngOnInit() {
    this.initForm();

    this.profileId = this.activatedRoute.snapshot.paramMap.get('id');
    this.subs.add(
      this.profilesProj.queryById$(this.profileId)
        .subscribe(profile => {
          this.formDataOrigin = profile;
          this.form.patchValue(profile);
          this.profile = profile;
        }));

    this.profilesCommands.queryById(this.profileId);

  }

  initForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      bio: ['', [Validators.required]],
    });
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


    this.profilesCommands.update(profile)
      .subscribe(this.onSuccess, this.onError);

  }

  resetForm() {
    this.form.reset();
  }

  onSuccess = (res) => {
    this.formDataOrigin = {id: this.profileId, ...this.form.getRawValue()};
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


  // get fullName() {
  //   const firstName = this.formDataOrigin.firstName ? this.formDataOrigin.firstName : this.form.get('firstName').value;
  //   const lastName = this.formDataOrigin.lastName ? this.formDataOrigin.lastName : this.form.get('lastName').value;
  //   return `${firstName}  ${lastName}`;
  // }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getFC(name) {
    return this.form.get(name);
  }

  onEditImg(profile) {
    this.router.navigate(['img'], {relativeTo: this.activatedRoute});
  }

  formData() {
    const {firstName, lastName, bio} = this.form.getRawValue();
    return {firstName, lastName, bio};
  }

  originData() {
    const {firstName, lastName, bio} = this.formDataOrigin;
    return {firstName, lastName, bio};
  }

  get hasChanges() {
    return !_.isEqual(this.formData(), this.originData());
  }

  getFirstNameErrorMessage() {
    return this.getFC('firstName').hasError('required')
      ? 'You must enter a value'
      : '';
  }

  getLastNameErrorMessage() {
    return this.getFC('lastName').hasError('required')
      ? 'You must enter a value'
      : '';
  }

  getBioErrorMessage() {
    return this.getFC('bio').hasError('required')
      ? 'You must enter a value'
      : '';
  }

}

