import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {getReducers} from './ui.reducer';
import {UiCommands} from './ui.commands';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {UiEffects} from './ui.effects';
import {UiProjection} from './ui.projections';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('ui', getReducers),
    EffectsModule.forFeature([UiEffects]),
  ],
  declarations: [],
  exports: [],
  providers: []
})
export class UiModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UiModule
    };
  }
}



