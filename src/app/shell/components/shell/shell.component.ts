import {
  AfterViewInit,
  Component,
  Injector,
  NgModuleFactoryLoader,
  OnInit, SystemJsNgModuleLoader,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {group, query, transition, trigger} from '@angular/animations';
import {translateX} from '../../../shared/animations';
import {AppService} from '../../../main/app.service';
import {ShellProjections} from '../../shell.projections';
import {RouterState} from '../../../shared/utils';
import * as _ from 'lodash';
import {ProfilesPluginService} from '../../../profiles/plugins/profiles-plugin.service';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {UiProjection} from '../../../ui/ui.projections';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [
    trigger('routeAnimation', [
      transition(':increment', [
        group([
          query(':enter', translateX, {optional: true, params: {from: '100%', to: '0'}}),
          query(':leave', translateX, {optional: true, params: {from: '0', to: '-100%'}})
        ])
      ]),
      transition(':decrement', [
        group([
          query(':enter', translateX, {optional: true, params: {from: '-100%', to: '0'}}),
          query(':leave', translateX, {optional: true, params: {from: '0', to: '100%'}})
        ])
      ])
    ])
  ],
  providers: [
    {
      provide: NgModuleFactoryLoader,
      useClass: SystemJsNgModuleLoader
    }
  ]
})
export class ShellComponent implements OnInit, AfterViewInit {

  @ViewChild('headerContainer', {read: ViewContainerRef})
  vcr: ViewContainerRef;

  isHandset$: Observable<any> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  isOpen: boolean;

  get isVisible(): boolean {
    return this.appService.headerIsVisible;
  }

  set isVisible(value: boolean) {
    this.appService.headerIsVisible = value;
  }


  constructor(private appService: AppService,
              private breakpointObserver: BreakpointObserver,
              private _injector: Injector,
              private uiProj: UiProjection,
              private route: ActivatedRoute,
              private profilesPluginService: ProfilesPluginService,
              private shellProjections: ShellProjections) {
  }

  ngOnInit() {

    this.shellProjections.getRouter()
      .subscribe((routerState: RouterState) => {
        if (_.get(routerState, 'data.header')) {
          const header = routerState.data.header;
          const headerFactory = this.profilesPluginService.resolver
            .resolveComponentFactory(this.profilesPluginService.entriesComponent[header]);
          this.vcr.clear();
          this.vcr.createComponent(headerFactory);
        }
        this.appService.headerIsVisible = true;
      });

    this.uiProj.getMenuOpen$().subscribe(x => {
      debugger
      console.log('okokok', x);
      this.isOpen = x;
    });

  }

  ngAfterViewInit(): void {

  }

  prepareRouteTransition(outlet: RouterOutlet): string | null {

    try {
      outlet.activatedRoute.snapshot.data['direction'];
    } catch (error) {
      return null;
    }
    // console.log('xxx', outlet.activatedRoute.snapshot.data['direction']);

    return outlet.activatedRoute.snapshot.data['direction'];
  }

  onActivate(e) {

  }

  onDeactivate(e) {

  }

}



