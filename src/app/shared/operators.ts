import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Command} from './command';

type ServiceFn = (any) => Observable<any>;

export const callService = (serviceFn: ServiceFn) => {
  return switchMap((cmd: Command<any, any>) => serviceFn(cmd.payload)
    .pipe(
      map((res) => {
        // debugger
        // return cmd.success(res);
        return res;
      }),
      catchError(err => {
        const errEvent = {...cmd, type: cmd.type + '_COMPLETE', error: err};
        return cmd.failure(errEvent);
      })
    ));
};

