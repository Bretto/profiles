import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {toEvent} from '../operators/operators';
import {UserCommands} from './user.commands';

@Injectable({providedIn: 'root'})
export class UserEffects {

  constructor(
    private actions$: Actions) {
    console.log('UserEffects');
  }

  @Effect()
  auth$ = this.actions$.pipe(
    ofType(UserCommands.SET_AUTH),
    toEvent());

}


