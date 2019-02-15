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
import {ShellProjections} from '../../shell.projections';
import * as _ from 'lodash';
import {ProfilesPluginService} from '../../../profiles/plugins/profiles-plugin.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DistinctUntilChanged} from '../../../decorators/decorators';
import {RouterState} from '../../../main/utils';
import {translateX} from '../../../main/animations';
import {UiCommands} from '../../../ui/store/ui.commands';
import {UiProjection} from '../../../ui/store/ui.projections';

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

  @DistinctUntilChanged()
  set isVisible(value: boolean) {
    this.uiCommands.setUi({headerIsVisible: value});
  }

  constructor(private uiCommands: UiCommands,
              private breakpointObserver: BreakpointObserver,
              private _injector: Injector,
              private uiProj: UiProjection,
              private route: ActivatedRoute,
              private profilesPluginService: ProfilesPluginService,
              private shellProjections: ShellProjections) {

    console.log('ShellComponent');
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
        this.uiCommands.setUi({headerIsVisible: true});
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
    if (this.uiProj.getState(['ui', 'openMenu']) !== e) {
      this.uiCommands.setUi({openMenu: e});
    }
  }

}



