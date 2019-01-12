import {Injectable} from '@angular/core';
import {from} from 'rxjs';
import {Array$ToObj$, SnackBar, ToEvent} from '../shared/decorators';
import {first, map} from 'rxjs/operators';
import {ProfilesCommands} from './profiles.commands';
import {AngularFirestore} from 'angularfire2/firestore';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(public db: AngularFirestore) {
  }

  // @SnackBar()
  @ToEvent(ProfilesCommands.QUERY_ALL)
  @Array$ToObj$('id')
  queryAll(data) {
    return this.db.collection('profile').valueChanges();
  }

  @ToEvent(ProfilesCommands.QUERY_BY_ID)
  queryById(id) {
    return this.db.doc(`profile/${id}`).valueChanges().pipe(first());
  }

  @SnackBar()
  @ToEvent(ProfilesCommands.UPDATE)
  update(profile) {
    profile = _.omitBy(profile, _.isNil);
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
  create(profile) {
    profile = _.omitBy(profile, _.isNil);
    const id = this.db.collection('collections').ref.doc().id;
    profile = {id, ...profile};
    return from(this.db.collection(`profile`)
      .doc(id).set(profile));
  }

  @SnackBar()
  @ToEvent(ProfilesCommands.DELETE)
  delete(id) {
    return from(this.db.doc(`profile/${id}`).delete()).pipe(map(x => id));
  }
}
