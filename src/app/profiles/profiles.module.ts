import {NgModule} from '@angular/core';
import {ProfilesComponent} from './components/profiles/profiles.component';
import {SharedModule} from '../shared/shared.module';
import {ProfilesRoutingModule} from './profiles-routing.module';
import {CardComponent} from './components/card/card.component';
import {ProfileEditComponent} from './components/profile-edit/profile-edit.component';
import {StoreModule} from '@ngrx/store';
import {getReducers} from './profiles.reducers';
import {ProfilesEffects} from './profiles.effects';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  imports: [
    SharedModule,
    ProfilesRoutingModule,
    StoreModule.forFeature('profiles', getReducers),
    EffectsModule.forFeature([ProfilesEffects]),
  ],
  declarations: [
    ProfilesComponent,
    CardComponent,
    ProfileEditComponent
  ],
})
export class ProfilesModule {
}
