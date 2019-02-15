import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {first} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UiProjection {
  constructor(private store: Store<any>) {
    console.log('UiProjection');
  }

  getState$<T>(path: string[]): Observable<T> {
    return this.store.select(...path);
  }

  getState<T>(path: string[]): T {
    let value;
    this.store.select(...path).pipe(first()).subscribe(v => value = v);
    return value;
  }


}
