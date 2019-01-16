import {RouterStateSerializer} from '@ngrx/router-store';
import {RouterStateSnapshot, Params} from '@angular/router';
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
//
//
// export function handleEvent<State, Event extends Action>(
//   cmdType: string | string[],
//   reducerFn: Reducer<State, Event>
// ): Reducer<State, Event> {
//
//   return (state: State, event: Event) => {
//
//     cmdType = Array.isArray(cmdType) ? cmdType : [cmdType];
//     const hasMatch: boolean = cmdType.some((cmd) => event.type === cmd + '_COMPLETE');
//
//     if (hasMatch) {
//       return reducerFn(state, event);
//     }
//
//     return state;
//   };
// }




export function reduceReducers<State>(
  init: State,
  reducers: Reducer<State, Action>[]
): Reducer<State, Action> {
  return (state: State = init, event: Action) =>
    reducers.reduce(
      (acc: State, curr: Reducer<State, Action>) => curr(acc, event)
      , state);
}

export type Reducer<State, Event> = (state: State, event: Event) => State;

export interface FSA<T = any> extends Action {
  payload: T;
  type: string;
  meta?: any;
  error?: any;
}

export function toEvent(str) {
  return str + '_COMPLETE';
}
