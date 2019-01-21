import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ProfilesProjections} from '../../profiles.projections';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfilesCommands} from '../../profiles.commands';
import {Subscription} from 'rxjs';
import {FormResponse} from '../../../shared/components/form-ui/form-ui.component';
import {AppService} from '../../../main/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  profile: any;
  profileId: string;

  constructor(private profilesProj: ProfilesProjections,
              private profilesCommands: ProfilesCommands,
              private appService: AppService,
              private ref: ChangeDetectorRef,
              private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

    console.log('ProfileComponent');

    this.profileId = route.snapshot.paramMap.get('id');
  }

  ngOnInit() {

    this.subs.add(
      this.profilesProj.queryById$(this.profileId)
        .subscribe(profile => {
          this.profile = profile;
        }));

    this.profilesCommands.queryById(this.profileId);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}

