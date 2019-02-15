import {Action} from '@ngrx/store';
import {Params} from '@angular/router';

export interface FSA<T = any> extends Action {
  payload: T;
  type: string;
  meta?: any;
  error?: any;
}

export interface RouterState {
  url: string;
  params: Params;
  data: any;
  path: string;
  queryParams: Params;
  previousState: any;
}
