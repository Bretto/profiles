import { Component, OnInit } from '@angular/core';
import {UiCommands} from '../../../ui/ui.commands';

@Component({
  selector: 'app-profiles-header',
  templateUrl: './profiles-header.component.html',
  styleUrls: ['./profiles-header.component.scss']
})
export class ProfilesHeaderComponent implements OnInit {

  constructor(private uiCommands: UiCommands) { }

  ngOnInit() {
  }

  onAdd() {
    console.log('on ADD');
  }

  onMenu() {
    this.uiCommands.openMenu(true);
  }
}
