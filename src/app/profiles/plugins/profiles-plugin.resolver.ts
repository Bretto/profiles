import {Injectable, Injector, NgModuleFactory, NgModuleFactoryLoader} from '@angular/core';
import {Resolve} from '@angular/router';
import {ProfilesPluginService} from './profiles-plugin.service';


@Injectable({providedIn: 'root'})
export class ProfileResolver implements Resolve<Promise<any>> {
  constructor(
    private loader: NgModuleFactoryLoader,
    private _injector: Injector,
    private profilesPluginService: ProfilesPluginService
  ) {
  }

  resolve() {
    return this.loader.load('src/app/profiles/plugins/profiles-plugin.module#ProfilesPluginModule')
      .then((moduleFactory: NgModuleFactory<any>) => {
        this.profilesPluginService.entriesComponent = (<any>moduleFactory.moduleType).entries;
        const moduleRef = moduleFactory.create(this._injector);
        this.profilesPluginService.resolver = moduleRef.componentFactoryResolver;
      })
      .catch(err => {
        console.error('error loading module', err);
      });
  }
}
