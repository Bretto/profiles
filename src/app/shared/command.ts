import {Action} from '@ngrx/store';
import {of} from 'rxjs/internal/observable/of';
import {Observable, ReplaySubject} from 'rxjs';

export interface IFluxStandardAction<Payload, Meta = undefined> extends Action {
  type: string;
  payload?: Payload;
  error?: boolean;
  meta?: Meta;
}

export class Command<Payload, Result = undefined> implements IFluxStandardAction<Payload> {

  type: string;
  payload?: Payload;
  meta?: any = {replaySubject: new ReplaySubject()};
  error?: boolean;

  constructor(action: Action, _meta?: any) {

    if (_meta) {
      this.meta = {...this.meta, ..._meta};
    }

    this.payload = (action as any).payload;
    this.type = action.type;
  }

  get result$(): Observable<Result> {
    return this.meta.replaySubject.asObservable();
  }

  success(event) {
    this.meta.replaySubject.next(event.payload);
    return event;
  }

  failure(event) {
    this.meta.replaySubject.error(event.payload);
    return of(event);
  }

}
