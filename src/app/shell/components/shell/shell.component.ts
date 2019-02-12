import {
  AfterViewInit,
  Component, ComponentRef,
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
import {BreakpointObserver} from '@angular/cdk/layout';
import {UiProjection} from '../../../ui/ui.projections';
import {UiCommands} from '../../../ui/ui.commands';

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

  isHandset: boolean;
  isOpen: boolean;

  get isVisible(): boolean {
    return this.uiProj.getState<boolean>(['ui', 'headerIsVisible']);
  }

  set isVisible(value: boolean) {
    this.uiCommands.headerIsVisible(value);
  }


  constructor(private appService: AppService,
              private uiCommands: UiCommands,
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
          const headerRef: ComponentRef<any> = this.vcr.createComponent(headerFactory);
          if (_.get(routerState, 'data.backUrl')) {
            headerRef.instance.backUrl = routerState.data.backUrl;
          }
        }
        // this.appService.headerIsVisible = true;
        this.uiCommands.headerIsVisible(true);
      });

    this.uiProj.getState$<boolean>(['ui', 'openMenu']).subscribe(x => this.isOpen = x);
    this.uiProj.getState$<boolean>(['ui', 'handset']).subscribe(x => this.isHandset = x);

  }

  ngAfterViewInit(): void {

  }

  prepareRouteTransition(outlet: RouterOutlet): string | null {

    try {
      outlet.activatedRoute.snapshot.data['direction'];
    } catch (error) {
      return null;
    }

    return outlet.activatedRoute.snapshot.data['direction'];
  }

  onActivate(e) {

  }

  onDeactivate(e) {

  }

  opened() {
    return !this.isHandset || this.isOpen;
  }

  openedChange(e) {
    this.uiCommands.openMenu(e);
  }

}



