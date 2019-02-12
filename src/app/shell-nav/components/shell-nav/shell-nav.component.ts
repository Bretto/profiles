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
import {RouterState} from '../../../shared/utils';
import * as _ from 'lodash';
import {ProfilesPluginService} from '../../../profiles/plugins/profiles-plugin.service';
import {ShellNavProjections} from '../../shell-nav.projections';
import {UiCommands} from '../../../ui/ui.commands';
import {UiProjection} from '../../../ui/ui.projections';

@Component({
  selector: 'app-shell-nav',
  templateUrl: './shell-nav.component.html',
  styleUrls: ['./shell-nav.component.scss'],
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
export class ShellNavComponent implements OnInit, AfterViewInit {

  @ViewChild('headerContainer', {read: ViewContainerRef})
  vcr: ViewContainerRef;

  cnt = 0;

  get isVisible(): boolean {
    return this.uiProj.getState<boolean>(['ui', 'headerIsVisible']);
  }

  set isVisible(value: boolean) {
    this.uiCommands.headerIsVisible(value);
  }


  constructor(private appService: AppService,
              private _injector: Injector,
              private route: ActivatedRoute,
              private uiCommands: UiCommands,
              private uiProj: UiProjection,
              private profilesPluginService: ProfilesPluginService,
              private shellProjections: ShellNavProjections) {
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
        // this.appService.headerIsVisible = true;
        this.uiCommands.headerIsVisible(true);
      });
  }

  ngAfterViewInit(): void {

  }

  prepareRouteTransition(outlet: RouterOutlet): string | null {

    // try {
    //   outlet.activatedRoute.snapshot.parent.children[0].params['navId'];
    // } catch (error) {
    //   return null;
    // }
    //
    // return outlet.activatedRoute.snapshot.parent.children[0].params['navId'];


    //return '' + this.appService.animationDirection;
    return '' + this.uiProj.getState<number>(['ui', 'animationDirection']);
  }

}






