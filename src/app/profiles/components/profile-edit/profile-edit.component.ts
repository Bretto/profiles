import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProfilesProjections} from '../../profiles.projections';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfilesCommands} from '../../profiles.commands';
import {Subject, Subscription} from 'rxjs';
import {FormResponse} from '../../../shared/components/form-ui/form-ui.component';
import {AppService} from '../../../main/app.service';
import {createExtensionsValidator, createMaxSizeValidator, FileUpload} from '../../../shared/file-uploader2.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  profile: any;
  profileId: string;
  imgLoaded: boolean;
  form: FormGroup;
  formDataOrigin: any = {};
  formRes: Subject<FormResponse> = new Subject<FormResponse>();
  newProfileMode: boolean;
  @ViewChild('uploader') uploader;

  constructor(private profilesProj: ProfilesProjections,
              private profilesCommands: ProfilesCommands,
              private appService: AppService,
              private ref: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute,
              private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    console.log('ProfileComponent');

    this.profileId = route.snapshot.paramMap.get('id');
    if (this.profileId === 'new') {
      this.newProfileMode = true;
    }
  }

  ngOnInit() {

    this.initForm();

    if (!this.newProfileMode) {
      this.subs.add(
        this.profilesProj.queryById$(this.profileId)
          .subscribe(profile => {
            this.formDataOrigin = profile;
            this.form.patchValue(profile);
            this.profile = profile;
          }));

      this.profilesCommands.queryById(this.profileId);
    }
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
    // const formData = this.uploader.getFormData();
    // this.setFormFields(formData);

    this.formRes.next({isPending: true});

    if (this.profileId) {
      this.profilesCommands.update({id: this.profileId, ...this.form.getRawValue()})
        .subscribe(this.onSuccess, this.onError);
    } else {
      this.profilesCommands.create(this.form.getRawValue())
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

  onRemoveFile(data: FileUpload) {
    this.uploader.removeFile(data);
  }

  setFormFields(formData) {
    if (this.form.getRawValue()) {
      _.forEach(this.form.getRawValue(), (v, k) => {
        if (k !== 'imgs') formData.append(k, v);
      });

      formData.append('id', this.profileId);
    }
  }

  onBrowse() {
    this.uploader.browseFiles();
  }

  getFC(name) {
    return this.form.get(name);
  }

  get imgs(): FileUpload[] {
    return this.getFC('imgs').value;
  }

  onEditImg(profile) {
    this.router.navigate(['img'], {relativeTo: this.activatedRoute});
  }

}

