import {EMPTY, fromEvent, merge} from 'rxjs';
import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {filter, map, startWith} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NavigationEnd, NavigationStart, RouteConfigLoadStart, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class Watcher {

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {

  }

  onlineWatcher = (status) => {
    if (status) {
      return merge(fromEvent(window, 'online'), fromEvent(window, 'offline')).pipe(
        map((ev: any) => ev.type === 'online'),
        startWith(true)
      );
    } else {
      return EMPTY;
    }
  }

  breakpointWatcher = (status) => {
    if (status) {
      return this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
          map(result => result.matches)
        );
    } else {
      return EMPTY;
    }
  }

  navigationWatcher = (status) => {
    if (status) {
      return this.router.events.pipe(
        filter(ev => ev instanceof NavigationStart
          || ev instanceof RouteConfigLoadStart
          || ev instanceof NavigationEnd
        ),
        map(ev => (ev instanceof NavigationStart || ev instanceof RouteConfigLoadStart))
      );
    } else {
      return EMPTY;
    }
  }
}


