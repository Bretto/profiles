import {catchError, distinctUntilChanged, filter, map, mergeMap, switchMap} from 'rxjs/operators';
import {Command} from './command';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Crud {

  constructor() {
  }

  query(cmds, service) {
    return [
      switchMap((cmd: Command<any, any>) => service(cmd.payload)
        .stateChanges()
        .pipe(
          map(res => {
            cmd.success(res);
            return res;
          }),
          catchError(err => cmd.failure({}))
        )),
      mergeMap((x: any) => x),
      filter((action: any) => {
        const data = action.payload.doc.data();
        return data.updatedAt && data.id;
      }),
      map((action: any) => {
        const type = cmds.reducer + '_' + action.type;
        return ({type, payload: action.payload.doc.data()});
      }),
      distinctUntilChanged()
    ];
  }

  standard(cmds, service) {
    return switchMap((cmd: Command<any, any>) => service(cmd.payload)
      .pipe(
        map((res) => cmd.success(res)),
        catchError(err => cmd.failure(err))
      ));
  }


}
