import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShellComponent} from './components/shell/shell.component';
import {ProfileResolver} from '../profiles/plugins/profiles-plugin.resolver';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: '../profiles/profiles.module#ProfilesModule',
        resolve: { _: ProfileResolver }
      }]
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(
      routes,
    )],
  exports: [RouterModule]
})
export class ShellRoutingModule {
}

