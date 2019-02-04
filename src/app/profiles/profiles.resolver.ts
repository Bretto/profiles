import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UiProjection} from '../ui/ui.projections';
import {delay, first, switchMap, tap} from 'rxjs/operators';
import {ProfilesProjections} from './profiles.projections';
import {Profile} from './profile.model';
import {ProfilesCommands} from './profiles.commands';

@Injectable({
  providedIn: 'root'
})
export class ProfilesResolver implements Resolve<any> {

  constructor(private profilesProj: ProfilesProjections, private profilesCommands: ProfilesCommands) {

  }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<Profile[] | boolean> {
    return this.profilesCommands.queryAll({})
      .pipe(
        delay(0), // leaves time to setup the store with the results for the projection
        switchMap(res => {
        return this.profilesProj.queryAll$().pipe(first());
      }));
  }

}

