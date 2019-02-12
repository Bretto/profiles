import {Injectable} from '@angular/core';
import {CommandsFactory} from '../shared/commands-factory';

@Injectable({providedIn: 'root'})
export class UiCommands {

  static ONLINE_WATCHER = '[UiCommands] ONLINE_WATCHER';
  static BREAKPOINT_WATCHER = '[UiCommands] BREAKPOINT_WATCHER';
  static NAVIGATION_WATCHER = '[UiCommands] NAVIGATION_WATCHER';
  static AUTH_WATCHER = '[UiCommands] AUTH_WATCHER';
  static OPEN_MENU = '[UiCommands] OPEN_MENU';
  static HEADER_IS_VISIBLE = '[UiCommands] HEADER_IS_VISIBLE';
  static ANIMATION_DIRECTION = '[UiCommands] ANIMATION_DIRECTION';
  static CURRENT_NAV = '[UiCommands] CURRENT_NAV';


  constructor(private factory: CommandsFactory) {
    console.log('UiCommands');
  }

  currentNav = this.factory.createCommand(UiCommands.CURRENT_NAV);
  animationDirection = this.factory.createCommand(UiCommands.ANIMATION_DIRECTION);
  headerIsVisible = this.factory.createCommand(UiCommands.HEADER_IS_VISIBLE);
  openMenu = this.factory.createCommand(UiCommands.OPEN_MENU);
  onlineWatcher = this.factory.createCommand(UiCommands.ONLINE_WATCHER);
  breakpointWatcher = this.factory.createCommand(UiCommands.BREAKPOINT_WATCHER);
  navigationWatcher = this.factory.createCommand(UiCommands.NAVIGATION_WATCHER);
  authWatcher = this.factory.createCommand(UiCommands.AUTH_WATCHER);

}
