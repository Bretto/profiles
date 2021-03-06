import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {materials} from './ng-material';
import {FontAwesome} from './font-awesome';
import {ReactiveFormsModule} from '@angular/forms';
import {FormUiComponent} from './components/form-ui/form-ui.component';
import {AuthRoleDirective, DropZoneDirective, OnLoadDirective} from './directives';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {StickyHeaderComponent} from './components/sticky-header/sticky-header.component';
import {RouterModule} from '@angular/router';
import {FileUploadComponent} from './components/file-upload/file-upload.component';
import {FileSizePipe} from './file-size.pipe';
import {PageWrapComponent} from './components/page-wrap/page-wrap.component';
import {PinchZoomModule} from 'ngx-pinch-zoom';
import {UiModule} from '../ui/ui.module';

const modules = [
  ...materials,
  FlexLayoutModule,
  ReactiveFormsModule,
  FontAwesome,
  ScrollingModule,
  PinchZoomModule,
];

const exports = [
  FormUiComponent,
  OnLoadDirective,
  DropZoneDirective,
  StickyHeaderComponent,
  FileUploadComponent,
  FileSizePipe,
  AuthRoleDirective,
  PageWrapComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ...modules
  ],
  declarations: exports,
  exports: [
    CommonModule,
    ...exports,
    ...modules
  ],
  entryComponents: [],
})
export class SharedModule {
}


