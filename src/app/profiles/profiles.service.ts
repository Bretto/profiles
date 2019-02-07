import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Array$ToObj$, SnackBar, ToEvent} from '../shared/decorators';
import {first, map} from 'rxjs/operators';
import {ProfilesCommands} from './profiles.commands';
import {AngularFirestore} from 'angularfire2/firestore';
import * as _ from 'lodash';
import {newProfile, IProfile} from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(public db: AngularFirestore) {
  }

  // @SnackBar()
  @ToEvent(ProfilesCommands.QUERY_ALL)
  @Array$ToObj$('id')
  queryAll(data): Observable<IProfile[]> {
    return this.db.collection('profile').valueChanges().pipe(
      map(entities => {
        return _.map(entities, (entity) => {
          return newProfile(entity);
        });
      })
    ) as Observable<IProfile[]>;
  }

  @ToEvent(ProfilesCommands.QUERY_BY_ID)
  queryById(id):  Observable<IProfile> {
    return this.db.doc(`profile/${id}`).valueChanges().pipe(
      map(data => newProfile(data))
    ) as  Observable<IProfile>;
  }

  @SnackBar()
  @ToEvent(ProfilesCommands.UPDATE)
  update(profile: IProfile): Observable<void> {
    profile = _.omitBy(profile, _.isNil) as IProfile;
    return from(this.db.doc(`profile/${profile.id}`).update(profile));
    // return of(profile).pipe(
    //   delay(3000),
    //   // tap(_ => {
    //   //   throw(new Error('Oops'));
    //   // })
    // );
  }

  @SnackBar()
  @ToEvent(ProfilesCommands.CREATE)
  create(profile: IProfile) {
    profile = _.omitBy(profile, _.isNil) as IProfile;
    return from(this.db.collection(`profile`)
      .doc(profile.id).set(profile));
  }

  @SnackBar()
  @ToEvent(ProfilesCommands.DELETE)
  delete(id) {
    return from(this.db.doc(`profile/${id}`).delete()).pipe(map(x => id));
  }
}


