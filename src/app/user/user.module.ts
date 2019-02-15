import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './components/user/user.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthService} from './auth.service';
import {auth} from 'firebase';
import {getReducers} from './store/user.reducer';
import {UserEffects} from './store/user.effects';
import {UserCommands} from './store/user.commands';

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

