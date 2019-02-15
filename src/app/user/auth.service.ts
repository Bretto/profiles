import {Injectable} from '@angular/core';

import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {

  user$: Observable<User | null> = this.afAuth.authState.pipe(
    switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {

  }


  async googleSignin() {
    const provider = new auth.FacebookAuthProvider(); // new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithRedirect(provider).catch(err => {
      alert(err);
    });
    // return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    // return this.router.navigate(['/']);
  }

  updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    userRef.set(data, {merge: true});
  }

}
