import { Component, OnInit } from '@angular/core';
import {UiCommands} from '../../../ui/ui.commands';
import {Observable} from 'rxjs';
import {UiProjection} from '../../../ui/ui.projections';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isHandset$: Observable<any> = this.uiProj.getBreakpoint$();
  constructor(private uiCommands: UiCommands, private uiProj: UiProjection) { }

  ngOnInit() {
  }

  onClose() {
    this.uiCommands.openMenu(false);
  }

}
