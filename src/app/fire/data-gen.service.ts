import {Injectable} from '@angular/core';
import {IProfile} from '../profiles/profile.model';
import {image, lorem, name, random} from 'faker';
import * as _ from 'lodash';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataGen {

  constructor(public db: AngularFirestore) {
  }

  async resetDB() {
    await this.deleteAll('profile');
    await this.createProfiles();
  }

  private async createProfiles() {
    const profiles: IProfile[] = Array(5)
      .fill(1)
      .map(_ => {

        const av = image.avatar();
        const firstName = name.firstName();
        const lastName = name.lastName();

        return {
          id: random.uuid(),
          firstName,
          lastName,
          bio: lorem.sentence(),
          pic: {source: av, thumb: av},
          deleted: false,
          fullName() {
            return `${firstName}  ${lastName}`;
          }
        };
      });

    return this.asyncReduce(profiles, async (acc, curr) => {
      acc.push(await this.createProfile(curr));
      return acc;
    }, []);

  }

  private createProfile = async (profile: IProfile) => {
    const profileData = _.omitBy(profile, _.isNil && _.isFunction);
    const doc = await this.db.collection('profile').doc(profileData.id).set(profileData);
    return profileData;
  };

  private async deleteAll(col) {
    const res: any = await this.db.collection(col).get().toPromise();
    const ids = res.docs.map(x => x.id);

    for (const id of ids) {
      const doc = await this.db.doc(`${col}/${id}`);
      await doc.delete();
    }
  }

  private async asyncReduce (src, callback, accumulator) {
    for (let i = 0; i < src.length; i++) {
      accumulator = await callback.call(undefined, accumulator, src[i], i);
    }
    return accumulator;
  }

}


