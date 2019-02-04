import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilesComponent} from './components/profiles/profiles.component';
import {ProfileEditComponent} from './components/profile-edit/profile-edit.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ImgEditComponent} from './components/img-edit/img-edit.component';
import {AuthGuard} from '../shared/guards/auth.guard';
import {ConfirmLeaveGuard} from '../shared/guards/confirm-leave.guard';
import {ProfilesResolver} from './profiles.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProfilesComponent,
    resolve: { profiles: ProfilesResolver},
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
      header: 'ProfileHeaderComponent',
      backUrl: '.'
    },
    canActivate: [AuthGuard],
    canDeactivate: [ConfirmLeaveGuard]
  },
  {
    path: 'new/img',
    component: ImgEditComponent,
    data: {
      direction: 4,
      header: 'ProfileHeaderComponent',
      backUrl: 'new'
    },
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ProfileComponent,
    data: {
      direction: 2,
      header: 'ProfileHeaderComponent',
      backUrl: '.'
    }
  },
  {
    path: ':id/edit',
    component: ProfileEditComponent,
    data: {
      direction: 3,
      header: 'ProfileHeaderComponent',
      backUrl: ':id'
    },
    canActivate: [AuthGuard],
    canDeactivate: [ConfirmLeaveGuard]
  },
  {
    path: ':id/edit/img',
    component: ImgEditComponent,
    data: {
      direction: 4,
      header: 'ProfileHeaderComponent',
      backUrl: ':id/edit/'
    },
    canActivate: [AuthGuard]
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




