import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './components/user/user.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './user.effects';
import {getReducers} from './user.reducer';
import {AuthService} from './auth.service';
import {UserCommands} from './user.commands';
import {auth} from 'firebase';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature('user', getReducers),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UserModule {
  constructor(private authService: AuthService, private userCmd: UserCommands) {
    console.log('UserModule');

    this.authService.user$.subscribe((authData) => {
        this.userCmd.setAuth(authData);
    });

    auth().getRedirectResult().then(credential => {
      if (credential && credential.user) {
        this.authService.updateUserData(credential.user);
      }
    }).catch(err => {
      alert(err);
    });

  }

}

