import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UiCommands} from './ui.commands';
import {toEvent} from '../../main/operators/operators';

@Injectable()
export class UiEffects {

  constructor(private actions$: Actions) {
    console.log('UiEffects');
  }

  @Effect()
  setUi$ = this.actions$.pipe(
    ofType(UiCommands.SET_UI),
    toEvent());
}



