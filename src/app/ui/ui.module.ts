import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {filter, map, startWith} from 'rxjs/operators';
import {EMPTY, fromEvent, merge} from 'rxjs';
import {NavigationEnd, NavigationStart, RouteConfigLoadStart, Router} from '@angular/router';
import {AuthService} from '../user/auth.service';
import {getReducers} from './store/ui.reducer';
import {UiEffects} from './store/ui.effects';
import {UiCommands} from './store/ui.commands';

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

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private auth: AuthService, private uiCommands: UiCommands) {

    console.log('UiModule');

    this.breakpointWatcher(true).subscribe(handset => {
      this.uiCommands.setUi({handset});
    });

    this.onlineWatcher(true).subscribe(online => {
      this.uiCommands.setUi({online});
    });
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

}



