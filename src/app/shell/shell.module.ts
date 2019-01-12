import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {ShellComponent} from './components/shell/shell.component';
import {ShellRoutingModule} from './shell-routing.module';

@NgModule({
  declarations: [
    ShellComponent,
  ],
  exports: [
    ShellComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShellRoutingModule
  ],
})
export class ShellModule {
}


