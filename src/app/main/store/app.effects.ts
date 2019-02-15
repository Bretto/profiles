import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {filter, map, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';


@Injectable({providedIn: 'root'})
export class AppEffects {

  constructor(private actions$: Actions,
              public snackBar: MatSnackBar
  ) {
    console.log('AppEffects');
  }

  @Effect({dispatch: false})
  error$ = this.actions$.pipe(
    filter((action: any) => !!action.error),
    map((action: any) => this.snackBar.open('ERROR', 'OK', {panelClass: 'error-snack'})));

  @Effect({dispatch: false})
  success$ = this.actions$.pipe(
    filter((action: any) => action.meta && action.meta.snackBar),
    tap((action: any) => this.snackBar.open('SUCCESS', '', {duration: 2000, panelClass: 'success-snack'})));




}
