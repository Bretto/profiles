import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {UiProjection} from '../../../ui/ui.projections';
import {UiCommands} from '../../../ui/ui.commands';


export interface Nav {
  name: string;
  pageId: string;
  navId: string;
  next: Nav;
  back: Nav;
}


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  nav1page1: any = {
    name: '1: One',
    pageId: '1:1',
    navId: '1',
  };

  nav1page2: any = {
    name: '1: Two',
    pageId: '1:2',
    navId: '1',
  };

  nav1page3: any = {
    name: '1: Three',
    pageId: '1:3',
    navId: '1',
  };


  nav2page1: any = {
    name: '2: One',
    pageId: '2:1',
    navId: '2',
  };

  nav2page2: any = {
    name: '2: Two',
    pageId: '2:2',
    navId: '2',
  };

  nav2page3: any = {
    name: '2: Three',
    pageId: '2:3',
    navId: '2',
  };


  nav3page1: any = {
    name: '3: One',
    pageId: '3:1',
    navId: '3',
  };

  nav3page2: any = {
    name: '3: Two',
    pageId: '3:2',
    navId: '3',
  };

  nav3page3: any = {
    name: '3: Three',
    pageId: '3:3',
    navId: '3',
  };


  lev1 = [
    this.nav1page1,
    this.nav1page2,
    this.nav1page3
  ];

  lev2 = [
    this.nav2page1,
    this.nav2page2,
    this.nav2page3
  ];

  lev3 = [
    this.nav3page1,
    this.nav3page2,
    this.nav3page3
  ];


  levs = [...this.lev1, ...this.lev2, ...this.lev3];
  navs;
  navId;
  pageId;


  constructor(private route: ActivatedRoute, private router: Router, private uiProj: UiProjection, private uiCmd: UiCommands) {
    console.log('NavComponent');

    this.nav1page1.next = this.nav2page1;
    this.nav1page1.back = null;

    this.nav1page2.next = this.nav2page2;
    this.nav1page2.back = null;

    this.nav1page3.next = this.nav2page3;
    this.nav1page3.back = null;


    this.nav2page1.next = this.nav3page1;
    this.nav2page1.back = this.nav1page1;

    this.nav2page2.next = this.nav3page2;
    this.nav2page2.back = this.nav1page2;

    this.nav2page3.next = this.nav3page3;
    this.nav2page3.back = this.nav1page3;


    this.nav3page1.next = null;
    this.nav3page1.back = this.nav2page1;

    this.nav3page2.next = null;
    this.nav3page2.back = this.nav2page2;

    this.nav3page3.next = null;
    this.nav3page3.back = this.nav2page3;


  }

  ngOnInit() {

    this.navId = this.route.snapshot.params['navId'];
    this.navs = this[`lev${this.navId}`];
    this.pageId = this.route.snapshot.parent.children[1].params['pageId'];
    this.uiCmd.currentNav(_.find(this.levs, {'pageId': this.pageId}));

  }

  onNav(nav) {
    this.uiCmd.animationDirection(this.uiProj.getState<number>(['ui', 'animationDirection']) + 1);
    this.router.navigate(['/nav/main', {outlets: {'page': [nav.next.pageId], 'nav': [nav.next.navId]}}]);
    this.uiCmd.currentNav(nav.next);
  }

  onBack() {
    this.uiCmd.animationDirection(this.uiProj.getState<number>(['ui', 'animationDirection']) - 1);
    const nav = this.uiProj.getState<Nav>(['ui', 'currentNav']);
    this.router.navigate(['/nav/main', {outlets: {'page': [nav.back.pageId], 'nav': [nav.back.navId]}}]);
    this.uiCmd.currentNav(nav.back);

  }

  get hasBack() {
     if (this.uiProj.getState<Nav>(['ui', 'currentNav'])) {
       return this.uiProj.getState<Nav>(['ui', 'currentNav']).back;
     }
  }

}
