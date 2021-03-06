import {NgModule} from '@angular/core';
import {ProfilesComponent} from './components/profiles/profiles.component';
import {SharedModule} from '../shared/shared.module';
import {ProfilesRoutingModule} from './profiles-routing.module';
import {CardComponent} from './components/card/card.component';
import {ProfileEditComponent} from './components/profile-edit/profile-edit.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ProfileComponent} from './components/profile/profile.component';
import { ImgEditComponent } from './components/img-edit/img-edit.component';
import { CardImgComponent } from './components/card-img/card-img.component';
import {CardDetailComponent} from './components/card-detail/card-detail.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import {getReducers} from './store/profiles.reducer';
import {ProfilesEffects} from './store/profiles.effects';

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
    CardImgComponent,
    ProfileEditComponent,
    ImgEditComponent,
    CardImgComponent,
    CardDetailComponent,
    CardHeaderComponent
  ],
})
export class ProfilesModule {
}
