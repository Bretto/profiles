import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShellNavComponent} from './components/shell-nav/shell-nav.component';
import {PageComponent} from './components/page/page.component';
import {NavComponent} from './components/nav/nav.component';

const routes: Routes = [
  {
    path: 'main',
    component: ShellNavComponent,
    children: [
      {
        outlet: 'page',
        path: ':pageId',
        component: PageComponent,
      },
      {
        outlet: 'nav',
        path: ':navId',
        component: NavComponent,
      }
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(
      routes,
    )],
  exports: [RouterModule]
})
export class ShellNavRoutingModule {
}


