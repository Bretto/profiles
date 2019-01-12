import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {ShellNavComponent} from './components/shell-nav/shell-nav.component';
import {ShellNavRoutingModule} from './shell-nav-routing.module';
import { PageComponent } from './components/page/page.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    ShellNavComponent,
    PageComponent,
    NavComponent,
  ],
  exports: [
    ShellNavComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShellNavRoutingModule
  ],
})
export class ShellNavModule {
}


