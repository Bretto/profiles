import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Command} from './command';

type ServiceFn = (any) => Observable<any>;

export const setStateFromServiceWithFeedback = (serviceFn: ServiceFn) => {
  return switchMap((cmd: Command<any, any>) => serviceFn(cmd.payload)
    .pipe(
      map((res) => {
        return cmd.success(res);
      }),
      catchError(err => {
        const errEvent = {...cmd, type: cmd.type + '_COMPLETE', error: err};
        return cmd.failure(errEvent);
      })
    ));
};

export  const setStateFromService = (propName: string, serviceFn: ServiceFn) => {
  return switchMap((cmd: Command<any, any>) => serviceFn(cmd.payload)
    .pipe( map(res => ({type: cmd.type + '_COMPLETE', payload: {propName, value: res}}))));
};

export  const setState = (propName: string) => {
  return map((cmd: Command<any, any>) => ({type: cmd.type + '_COMPLETE', payload: {propName, value: cmd.payload}}));
};

