import {Action, Store} from '@ngrx/store';
import {Command} from './command';
import {Injectable} from '@angular/core';


import {createAction} from 'redux-actions';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommandsFactory {

  constructor(private store: Store<any>) {
  }

  createCommand<Payload>(type: string) {
    return (payload: Payload) => {
      const action: Action = createAction(type)(payload);
      this.store.dispatch(action);
    };
  }

  createCommandWithRes<Payload, Result>(type: string) {
    return (payload: Payload, meta?: any) => {
      const action: Action = createAction(type)(payload);
      return this.dispatch(action, meta);
    };
  }

  dispatch<Payload, Result>(ac: Action, meta?: any): Observable<Result> {
    const action = new Command<Payload, Result>(ac, meta);
    this.store.dispatch(action);
    return action.result$;
  }
}
