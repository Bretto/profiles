import {RouterStateSerializer} from '@ngrx/router-store';
import * as firebase from 'firebase/app';

let previousState;

export class CustomRouterStateSerializer
  implements RouterStateSerializer<any> {
  serialize(routerState: any): any {
    let route = routerState.root;

    let path = '';
    while (route.firstChild) {
      route = route.firstChild;
      if (route && route.routeConfig.path !== '') {
        path += `/${route.routeConfig.path}` || '';
      }
    }

    const {
      url,
      root: {queryParams},
    } = routerState;
    const {params, data} = route;

    let state: any = {url, params, queryParams, path, data};
    const currentState = state;

    if (!previousState) {
      previousState = currentState;
      state = {...currentState, previousState};
    } else {
      state = {...currentState, previousState};
      previousState = currentState;
    }

    return state;
  }
}

export function toEvent(str) {
  return str + '_COMPLETE';
}

export function getUID(col): string {
  return firebase.firestore().collection(col).doc().id;
}


