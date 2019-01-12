
import {storeLogger} from 'ngrx-store-logger';
import * as fromRouter from '@ngrx/router-store';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../environments/environment';




export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return storeLogger()(reducer);
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [
  logger,
  // storeFreeze
] : [];

















