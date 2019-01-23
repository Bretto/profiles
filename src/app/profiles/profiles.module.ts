import {NgModule} from '@angular/core';
import {ProfilesComponent} from './components/profiles/profiles.component';
import {SharedModule} from '../shared/shared.module';
import {ProfilesRoutingModule} from './profiles-routing.module';
import {CardComponent} from './components/card/card.component';
import {ProfileEditComponent} from './components/profile-edit/profile-edit.component';
import {StoreModule} from '@ngrx/store';
import {getReducers} from './profiles.reducer';
import {ProfilesEffects} from './profiles.effects';
import {EffectsModule} from '@ngrx/effects';
import {ProfileComponent} from './components/profile/profile.component';
import { ImgEditComponent } from './components/img-edit/img-edit.component';

@NgModule({
  imports: [
    SharedModule,
    ProfilesRoutingModule,
    StoreModule.forFeature('profiles', getReducers),
    EffectsModule.forFeature([ProfilesEffects]),
  ],
  declarations: [
    ProfilesComponent,
    ProfileComponent,
    CardComponent,
    ProfileEditComponent,
    ImgEditComponent
  ],
})
export class ProfilesModule {
}
