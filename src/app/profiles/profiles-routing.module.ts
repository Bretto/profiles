import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilesComponent} from './components/profiles/profiles.component';
import {ProfileEditComponent} from './components/profile-edit/profile-edit.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ImgEditComponent} from './components/img-edit/img-edit.component';

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
    path: 'new',
    component: ProfileEditComponent,
    data: {
      direction: 2,
      header: 'ProfileHeaderComponent'
    }
  },
  {
    path: ':id',
    component: ProfileComponent,
    data: {
      direction: 2,
      header: 'ProfileHeaderComponent'
    }
  },
  {
    path: ':id/edit',
    component: ProfileEditComponent,
    data: {
      direction: 3,
      header: 'ProfileHeaderComponent'
    }
  },
  {
    path: ':id/edit/img',
    component: ImgEditComponent,
    data: {
      direction: 4,
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




