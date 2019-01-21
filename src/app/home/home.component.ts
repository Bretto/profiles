import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {image, lorem, name, random} from 'faker';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../main/app.service';


Array.prototype['asyncReduce'] = async function (callback, initialVal) {
  let accumulator = (initialVal === undefined) ? undefined : initialVal;
  for (let i = 0; i < this.length; i++) {
    if (accumulator !== undefined) {
      accumulator = await callback.call(undefined, accumulator, this[i], i, this);
    } else {
      accumulator = this[i];
    }
  }
  return accumulator;
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public db: AngularFirestore,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private auth: AuthService) {
  }

  ngOnInit() {
  }

  async onResetDB() {
    await this.deleteAll('profile');
    await this.createProfiles();
  }

  private async createProfiles() {
    const profiles: any = Array(5)
      .fill(1)
      .map(_ => {
        return {
          id: random.uuid(),
          firstName: name.firstName(),
          lastName: name.lastName(),
          bio: lorem.sentence(),
          pic: image.avatar()
        };
      });

    return profiles.asyncReduce(async (acc, curr) => {
      acc.push(await this.createProfile(curr));
      return acc;
    }, []);
  }

  private createProfile = async (profile) => {
    const doc = await this.db.collection('profile').doc(profile.id).set(profile);
    console.log('doc create', profile);
    return profile;
  }

  private async deleteAll(col) {
    const res: QuerySnapshot = await this.db.collection(col).get().toPromise();
    const ids = res.docs.map(x => x.id);

    for (const id of ids) {
      const doc = await this.db.doc(`${col}/${id}`);
      await doc.delete();
    }
  }

  onGoogleLogin() {
    this.auth.googleSignin().then(res => {
      this.router.navigate(['profile'], {relativeTo: this.activatedRoute});
    });
  }

}




