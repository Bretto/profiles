import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ProfilesProjections} from '../../profiles.projections';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ProfilesCommands} from '../../profiles.commands';
import {Subscription} from 'rxjs';
import {AppService} from '../../../main/app.service';
import {IProfile} from '../../profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  profile: IProfile;
  profileId: string;

  constructor(private profilesProj: ProfilesProjections,
              private profilesCommands: ProfilesCommands,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    console.log('ProfileComponent');

    this.profileId = activatedRoute.snapshot.paramMap.get('id');
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

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }

  onEditImg(profile) {
    this.router.navigate(['edit', 'img'], {relativeTo: this.activatedRoute});
  }

}

