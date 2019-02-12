import { Component, OnInit } from '@angular/core';
import {UiCommands} from '../../../ui/ui.commands';
import {Observable} from 'rxjs';
import {UiProjection} from '../../../ui/ui.projections';
import {AuthService} from '../../../shared/services/auth.service';

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
    this.uiCommands.openMenu(false);
  }

  onGoogleLogin() {
    this.auth.googleSignin().then(res => {
      console.log('res', res);
    });
  }

}
