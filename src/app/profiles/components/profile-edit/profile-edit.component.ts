import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfilesProjections} from '../../profiles.projections';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfilesCommands} from '../../profiles.commands';
import {filter, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FormResponse} from '../../../shared/components/form-ui/form-ui.component';
import {AppService} from '../../../main/app.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit, OnDestroy {

  profile$;
  profileId: string;
  form: FormGroup;
  formDataOrigin: any = {};
  formRes: Subject<FormResponse> = new Subject<FormResponse>();
  newProfileMode: boolean;


  constructor(private profilesProj: ProfilesProjections, private profilesActions: ProfilesCommands,
              private appService: AppService,
              private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    console.log('ProfileEditComponent');

    this.profileId = route.snapshot.paramMap.get('id');
    if (this.profileId === 'new') {
      this.newProfileMode = true;
    }
  }

  ngOnInit() {

    this.initForm();

    if (!this.newProfileMode) {
      this.profile$ = this.profilesProj.queryById$(this.profileId)
        .pipe(
          filter(Boolean),
          tap(profile => {
            this.formDataOrigin = profile;
            this.form.patchValue(profile);
          })
        );

      this.profilesActions.queryById(this.profileId);
    }
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
    this.profilesActions.delete(this.profileId)
      .subscribe(this.onSuccess, this.onError);
  }

  onSubmit() {
    this.formRes.next({isPending: true});
    if (this.profileId) {
      this.profilesActions.update({id: this.profileId, ...this.form.getRawValue(), pic: this.formDataOrigin.pic})
        .subscribe(this.onSuccess, this.onError);
    } else {
      this.profilesActions.create(this.form.getRawValue())
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
    return this.formDataOrigin ? `${this.formDataOrigin.firstName}  ${this.formDataOrigin.lastName}` : '';
  }

  ngOnDestroy() {

  }

  get headerIsVisible() {
    if (this.appService) {
      return this.appService.headerIsVisible;
    }
  }

}

