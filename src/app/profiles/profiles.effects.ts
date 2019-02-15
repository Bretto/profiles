import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProfilesCommands} from './profiles.commands';
import {ProfilesService} from './profiles.service';
import {MatSnackBar} from '@angular/material';
import {setStateFromServiceWithFeedback} from '../operators/operators';


@Injectable({providedIn: 'root'})
export class ProfilesEffects {

  constructor(private actions$: Actions,
              private service: ProfilesService,
              public snackBar: MatSnackBar
  ) {
    console.log('ProfilesEffects');
  }


  @Effect()
  queryAll = this.actions$.pipe(
    ofType(ProfilesCommands.QUERY_ALL),
    setStateFromServiceWithFeedback((payload: any) => this.service.queryAll(payload)));

  @Effect()
  queryById = this.actions$.pipe(
    ofType(ProfilesCommands.QUERY_BY_ID),
    setStateFromServiceWithFeedback((payload: any) => this.service.queryById(payload)));

  @Effect()
  create = this.actions$.pipe(
    ofType(ProfilesCommands.CREATE),
    setStateFromServiceWithFeedback((payload: any) => this.service.create(payload)));

  @Effect()
  update = this.actions$.pipe(
    ofType(ProfilesCommands.UPDATE),
    setStateFromServiceWithFeedback((payload: any) => this.service.update(payload)));

  @Effect()
  delete = this.actions$.pipe(
    ofType(ProfilesCommands.DELETE),
    setStateFromServiceWithFeedback((payload: any) => this.service.delete(payload)));

}
