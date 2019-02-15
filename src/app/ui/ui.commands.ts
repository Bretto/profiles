import {Injectable} from '@angular/core';
import {UiState} from './ui.reducer';
import {CommandsFactory} from '../services/commands-factory';

@Injectable({providedIn: 'root'})
export class UiCommands {

  static SET_UI = '[UiCommands] SET_UI';

  constructor(private factory: CommandsFactory) {
    console.log('UiCommands');
  }

  setUi = this.factory.createCommand<UiState>(UiCommands.SET_UI);
}
