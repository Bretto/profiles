import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile', loadChildren: '../shell/shell.module#ShellModule'},
  {path: 'nav', loadChildren: '../shell-nav/shell-nav.module#ShellNavModule'},
  {path: '404', component: NotFoundPageComponent},
  {path: '**', redirectTo: '404'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        // onSameUrlNavigation: 'reload'
        // enableTracing: true <-- debugging purposes only
      }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

