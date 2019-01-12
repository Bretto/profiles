import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShellProjections {

  constructor(private store: Store<any>) {
    console.log('ShellProjections');
  }

  getRouter(): Observable<any> {
    return this.store.select('router', 'state');
  }
}

