import {RouterStateSerializer} from '@ngrx/router-store';
import {Params} from '@angular/router';
import {Action} from '@ngrx/store';

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot
 * and returns any pertinent information needed. The snapshot contains
 * all information about the state of the router at the given point in time.
 * The entire snapshot is complex and not always needed. In this case, you only
 * need the URL and query parameters from the snapshot in the store. Other items could be
 * returned such as route parameters and static route data.
 */

export interface RouterState {
  url: string;
  params: Params;
  data: any;
  queryParams: Params;
}

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

    return {url, params, queryParams, path, data};
  }
}


export interface FSA<T = any> extends Action {
  payload: T;
  type: string;
  meta?: any;
  error?: any;
}

export function toEvent(str) {
  return str + '_COMPLETE';
}
