import {Injectable} from '@angular/core';
import {CommandsFactory} from '../shared/commands-factory';

@Injectable({providedIn: 'root'})
export class ProfilesCommands {

  constructor(private factory: CommandsFactory) {
    console.log('ProfilesCommands');
  }

  static QUERY_ALL = `[${name}] QUERY_ALL`;
  static QUERY_BY_ID = `[${name}] QUERY_BY_ID`;
  static CREATE = `[${name}] CREATE`;
  static UPDATE = `[${name}] UPDATE`;
  static DELETE = `[${name}] DELETE`;

  name = 'ProfilesCommands';

  queryAll = this.factory.createCommandWithRes<any, any>(ProfilesCommands.QUERY_ALL);
  queryById = this.factory.createCommandWithRes<any, any>(ProfilesCommands.QUERY_BY_ID);
  create = this.factory.createCommandWithRes<any, any>(ProfilesCommands.CREATE);
  update = this.factory.createCommandWithRes<any, any>(ProfilesCommands.UPDATE);
  delete = this.factory.createCommandWithRes<any, any>(ProfilesCommands.DELETE);

}
