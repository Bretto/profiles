
import {storeLogger} from 'ngrx-store-logger';
import * as fromRouter from '@ngrx/router-store';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../environments/environment';
import {localStorageSync} from 'ngrx-store-localstorage';




export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['router'],
    rehydrate: false,
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [
  logger,
  storeFreeze,
  // localStorageSyncReducer
] : [
  // localStorageSyncReducer
];







