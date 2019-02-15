import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../../../user/auth.service';
import {UiProjection} from '../../../ui/store/ui.projections';
import {UiCommands} from '../../../ui/store/ui.commands';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.uiProj.getState$<boolean>(['ui', 'handset']);
  constructor(private uiCommands: UiCommands, private uiProj: UiProjection, public auth: AuthService) { }

  ngOnInit() {
  }

  onClose() {
    this.uiCommands.setUi({openMenu: false});
  }

  onGoogleLogin() {
    this.auth.googleSignin().then(res => {
      console.log('res', res);
    });
  }

}
