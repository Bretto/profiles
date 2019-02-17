import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {firebaseConfig} from './firebase-config';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFirestore, FirestoreSettingsToken} from 'angularfire2/firestore';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [
    AngularFirestore,
    AngularFireAuth,
    {provide: FirestoreSettingsToken, useValue: {}}
  ],
})
export class FireModule { }
