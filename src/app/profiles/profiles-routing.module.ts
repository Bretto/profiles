import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilesComponent} from './components/profiles/profiles.component';
import {ProfileEditComponent} from './components/profile-edit/profile-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesComponent,
    data: {
      direction: 1,
      header: 'ProfilesHeaderComponent'
    }
  },
  {
    path: 'profile/new',
    component: ProfileEditComponent,
    data: {
      direction: 2,
      header: 'ProfileHeaderComponent'
    }
  },
  // TODO why does 'profile/:id' doesn't work for /new ?
  {
    path: 'profile/:id',
    component: ProfileEditComponent,
    data: {
      direction: 2,
      header: 'ProfileHeaderComponent'
    }
  },

];


@NgModule({
  imports: [
    RouterModule.forChild(
      routes,
    )],
  exports: [RouterModule]
})
export class ProfilesRoutingModule {
}




