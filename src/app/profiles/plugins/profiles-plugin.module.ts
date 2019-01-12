import {NgModule} from '@angular/core';
import {ProfileHeaderComponent} from './profile-header/profile-header.component';
import {ProfilesHeaderComponent} from './profiles-header/profiles-header.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ProfileHeaderComponent,
    ProfilesHeaderComponent
  ],
  entryComponents: [
    ProfileHeaderComponent,
    ProfilesHeaderComponent
  ],
})
export class ProfilesPluginModule {
  static entries = {
    ProfileHeaderComponent,
    ProfilesHeaderComponent
  };
}
