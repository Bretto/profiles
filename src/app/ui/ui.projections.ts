import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {filter, first, map, tap} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({providedIn: 'root'})
export class UiProjection {
  constructor(private store: Store<any>) {
    console.log('UiProjection');
  }

  getOnline$(): Observable<any> {
    return this.store.select('ui', 'online');
  }

  getBreakpoint$(): Observable<any> {
    return this.store.select('ui', 'handset');
  }

  getMenuOpen$(): Observable<any> {
    return this.store.select('ui', 'openMenu');
  }

  getUrl() {
    return this.store.select('router', 'state', 'url').pipe(filter(Boolean));
  }


  getUser$() {
    return this.store.select('ui', 'user');
  }

  getUser() {
    let user = null;
    this.store.select('ui', 'user').pipe(first()).subscribe(u => user = u);
    return user;
  }


  getRouterState() {
   return this.store.select('router', 'state');
  }




}
