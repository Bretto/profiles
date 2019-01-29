import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Obj$ToArray$} from '../shared/decorators';
import {filter} from 'rxjs/operators';
import {Profile} from './profile.model';

@Injectable({providedIn: 'root'})
export class ProfilesProjections {
  constructor(private store: Store<any>) {
    console.log('UiProjection');
  }

  @Obj$ToArray$()
  queryAll$(): Observable<Profile[]> {
    return this.store.select('profiles', 'entities')
      .pipe(filter(res => res && Object.keys(res).length > 0));
  }

  queryById$(id): Observable<Profile> {
    return this.store.select('profiles', 'entities', id)
      .pipe(filter(Boolean));
  }
}
