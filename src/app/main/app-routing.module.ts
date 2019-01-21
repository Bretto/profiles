import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from '../not-found-page/not-found-page.component';
import {HomeComponent} from '../home/home.component';

const routes: Routes = [
  // {path: '', redirectTo: '/group', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'profile', loadChildren: '../shell/shell.module#ShellModule'},
  {path: 'nav', loadChildren: '../shell-nav/shell-nav.module#ShellNavModule'},
  {path: '404', component: NotFoundPageComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        scrollPositionRestoration: 'enabled'
        // enableTracing: true <-- debugging purposes only
      }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

