import {Injectable} from '@angular/core';
import {CommandsFactory} from '../shared/commands-factory';

@Injectable({providedIn: 'root'})
export class UiCommands {

  static ONLINE_WATCHER = '[UiCommands] ONLINE_WATCHER';
  static BREAKPOINT_WATCHER = '[UiCommands] BREAKPOINT_WATCHER';
  static NAVIGATION_WATCHER = '[UiCommands] NAVIGATION_WATCHER';
  static OPEN_MENU = '[UiCommands] OPEN_MENU';


  constructor(private factory: CommandsFactory) {
    console.log('UiCommands');
  }

  openMenu = this.factory.createCommand(UiCommands.OPEN_MENU);
  onlineWatcher = this.factory.createCommand(UiCommands.ONLINE_WATCHER);
  breakpointWatcher = this.factory.createCommand(UiCommands.BREAKPOINT_WATCHER);
  navigationWatcher = this.factory.createCommand(UiCommands.NAVIGATION_WATCHER);

}
