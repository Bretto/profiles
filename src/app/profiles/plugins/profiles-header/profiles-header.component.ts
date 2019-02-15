import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IProfile, newProfile} from '../../profile.model';
import {ActivatedRoute, Router} from '@angular/router';
import {getUID} from '../../../main/utils';
import {UiCommands} from '../../../ui/store/ui.commands';
import {UiProjection} from '../../../ui/store/ui.projections';
import {ProfilesCommands} from '../../store/profiles.commands';

@Component({
  selector: 'app-profiles-header',
  templateUrl: './profiles-header.component.html',
  styleUrls: ['./profiles-header.component.scss']
})
export class ProfilesHeaderComponent implements OnInit {
  isHandset$: Observable<boolean> = this.uiProj.getState$<boolean>(['ui', 'handset']);
  profileId: string;
  profile: IProfile;

  constructor(private uiCommands: UiCommands,
              private activatedRoute: ActivatedRoute,
              private uiProj: UiProjection,
              private router: Router,
              private profilesCommands: ProfilesCommands) {
  }

  ngOnInit() {
  }

  onAdd() {
    this.profileId = getUID('profile');
    this.profile = newProfile({id: this.profileId});

    this.profilesCommands.create({...this.profile})
      .subscribe(this.onSuccess, this.onError);
  }

  onMenu() {
    this.uiCommands.setUi({openMenu: true});
  }

  onSuccess = (res) => {
    this.router.navigate([this.profileId, 'edit'], {relativeTo: this.activatedRoute});
  };

  onError = (err) => {

  };
}
