import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Array$ToObj$, SnackBar, ToEvent} from '../shared/decorators';
import {first, map} from 'rxjs/operators';
import {ProfilesCommands} from './profiles.commands';
import {AngularFirestore} from 'angularfire2/firestore';
import * as _ from 'lodash';
import {Profile} from './profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(public db: AngularFirestore) {
  }

  // @SnackBar()
  @ToEvent(ProfilesCommands.QUERY_ALL)
  @Array$ToObj$('id')
  queryAll(data): Observable<Profile[]> {
    return this.db.collection('profile').valueChanges() as Observable<Profile[]>;
  }

  @ToEvent(ProfilesCommands.QUERY_BY_ID)
  queryById(id):  Observable<Profile> {
    return this.db.doc(`profile/${id}`).valueChanges().pipe(first()) as  Observable<Profile>;
  }

  @SnackBar()
  @ToEvent(ProfilesCommands.UPDATE)
  update(profile: Profile): Observable<void> {
    profile = _.omitBy(profile, _.isNil) as Profile;
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
  create(profile: Profile) {
    profile = _.omitBy(profile, _.isNil) as Profile;
    return from(this.db.collection(`profile`)
      .doc(profile.id).set(profile));
  }

  @SnackBar()
  @ToEvent(ProfilesCommands.DELETE)
  delete(id) {
    return from(this.db.doc(`profile/${id}`).delete()).pipe(map(x => id));
  }
}
