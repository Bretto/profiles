import { Component, OnInit } from '@angular/core';
import {UiCommands} from '../../../ui/ui.commands';
import {Observable} from 'rxjs';
import {UiProjection} from '../../../ui/ui.projections';

@Component({
  selector: 'app-profiles-header',
  templateUrl: './profiles-header.component.html',
  styleUrls: ['./profiles-header.component.scss']
})
export class ProfilesHeaderComponent implements OnInit {
  isHandset$: Observable<any> = this.uiProj.getBreakpoint$();

  constructor(private uiCommands: UiCommands, private uiProj: UiProjection) { }

  ngOnInit() {
  }

  onAdd() {
    console.log('on ADD');
  }

  onMenu() {
    this.uiCommands.openMenu(true);
  }
}
