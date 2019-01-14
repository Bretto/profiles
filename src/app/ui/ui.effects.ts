import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UiCommands} from './ui.commands';
import {Watcher} from '../main/watcher';
import {Crud} from '../shared/crud';
import {setState, setStateWithService} from '../shared/operators';

@Injectable({providedIn: 'root'})
export class UiEffects {

  constructor(
    private actions$: Actions,
    private uiCommands: UiCommands,
    private crud: Crud,
    private watcher: Watcher) {
    console.log('UiEffects');

    this.uiCommands.onlineWatcher({});
    this.uiCommands.breakpointWatcher({});
    // this.uiCommands.navigationWatcher({});

  }

  @Effect()
  openMenu$ = this.actions$.pipe(
    ofType(UiCommands.OPEN_MENU),
    setState('openMenu'));

  @Effect()
  online$ = this.actions$.pipe(
    ofType(UiCommands.ONLINE_WATCHER),
    setStateWithService('online', this.watcher.onlineWatcher));

  @Effect()
  handset$ = this.actions$.pipe(
    ofType(UiCommands.BREAKPOINT_WATCHER),
    setStateWithService('handset', this.watcher.breakpointWatcher));

  // map((action: any) => action.payload),
  // switchMap((status) => this.watcher.onlineWatcher(status).pipe(
  //   map(res => this.uiEvents.setOnline(res)))
  // ));

  // @Effect()
  // breakpoint$ = this.actions$.pipe(
  //   ofType(UiCommands.BREAKPOINT_WATCHER),
  //   map((action: any) => action.payload),
  //   switchMap((status) => this.watcher.breakpointWatcher(status).pipe(
  //     map(res => this.uiEvents.setHandset(res)))
  //   ));

  // @Effect()
  // navigation$ = this.actions$.pipe(
  //   ofType(UiCommands.NAVIGATION_WATCHER),
  //   this.crud.standard(this.categoryCommands, this.categoryService.delete)

}


