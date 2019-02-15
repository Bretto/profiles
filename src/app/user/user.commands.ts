import {Injectable} from '@angular/core';
import {CommandsFactory} from '../services/commands-factory';

@Injectable({providedIn: 'root'})
export class UserCommands {

  static SET_AUTH = '[UserCommands] SET_AUTH';

  constructor(private factory: CommandsFactory) {
    console.log('UserCommands');
  }

  setAuth = this.factory.createCommand<User | null>(UserCommands.SET_AUTH);
}
