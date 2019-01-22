import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

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
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    auth().getRedirectResult().then(credential => {
      if (credential && credential.user) {
        this.updateUserData(credential.user);
      }
    }).catch(err => {
      alert(err);
    });

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
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

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, {merge: true});

  }

}
