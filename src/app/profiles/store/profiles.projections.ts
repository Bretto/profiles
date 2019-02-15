import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import * as _ from 'lodash';
import {IProfile, newProfile} from '../profile.model';
import {Obj$ToArray$} from '../../main/decorators/decorators';

@Injectable({providedIn: 'root'})
export class ProfilesProjections {
  constructor(private store: Store<any>) {
    console.log('UiProjection');
  }

  @Obj$ToArray$()
  queryAll$(): Observable<IProfile[]> {
    return this.store.select('profiles', 'entities')
      .pipe(
        filter(res => res && Object.keys(res).length > 0),
        map(entities => {
          return _.map(entities, (entity) => {
            return newProfile(entity);
          });
        })
      );
  }

  queryById$(id): Observable<IProfile> {
    return this.store.select('profiles', 'entities', id)
      .pipe(filter(Boolean), map(data => newProfile(data)));
  }
}


