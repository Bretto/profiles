import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UiCommands} from './ui.commands';
import {Watcher} from '../main/watcher';
import {setState, setStateFromService} from '../shared/operators';

@Injectable({providedIn: 'root'})
export class UiEffects {

  constructor(
    private actions$: Actions,
    private uiCommands: UiCommands,
    private watcher: Watcher) {
    console.log('UiEffects');

    this.uiCommands.onlineWatcher({});
    this.uiCommands.breakpointWatcher({});
    this.uiCommands.authWatcher({});
    // this.uiCommands.navigationWatcher({});

  }

  @Effect()
  currentNav$ = this.actions$.pipe(
    ofType(UiCommands.CURRENT_NAV),
    setState('currentNav'));

  @Effect()
  animationDirection$ = this.actions$.pipe(
    ofType(UiCommands.ANIMATION_DIRECTION),
    setState('animationDirection'));

  @Effect()
  headerIsVisible$ = this.actions$.pipe(
    ofType(UiCommands.HEADER_IS_VISIBLE),
    setState('headerIsVisible'));

  @Effect()
  openMenu$ = this.actions$.pipe(
    ofType(UiCommands.OPEN_MENU),
    setState('openMenu'));

  @Effect()
  online$ = this.actions$.pipe(
    ofType(UiCommands.ONLINE_WATCHER),
    setStateFromService('online', this.watcher.onlineWatcher));

  @Effect()
  handset$ = this.actions$.pipe(
    ofType(UiCommands.BREAKPOINT_WATCHER),
    setStateFromService('handset', this.watcher.breakpointWatcher));

  @Effect()
  auth$ = this.actions$.pipe(
    ofType(UiCommands.AUTH_WATCHER),
    setStateFromService('user', this.watcher.authWatcher));

}


