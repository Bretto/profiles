import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProfilesCommands} from '../../profiles.commands';
import {ProfilesProjections} from '../../profiles.projections';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../../main/app.service';
import {Observable, Subscription} from 'rxjs';
import {Profile} from '../../profile.model';
import {UiProjection} from '../../../ui/ui.projections';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit, OnDestroy, AfterViewInit {

  profiles$: Observable<Profile[]>;
  profiles: Profile[];
  subs: Subscription = new Subscription();

  @ViewChild('cards') cards: ElementRef;

  constructor(private profilesCommands: ProfilesCommands,
              private appService: AppService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private uiProj: UiProjection,
              private profilesProj: ProfilesProjections) {

    console.log('ProfilesComponent');

    // this.profiles$ = profilesProj.queryAll$();
  }

  ngOnInit() {
    this.profiles = this.activatedRoute.snapshot.data.profiles || [];

    // this.profilesCommands.queryAll({});
    // .subscribe(res => {
    //   // console.log('res', res);
    // }, err => {
    //
    // });
  }

  ngAfterViewInit() {

    this.uiProj.getRouterState().pipe(first()).subscribe(state => {
      if (state.previousState.params.id) {
        const elm = document.getElementById(state.previousState.params.id);
        const offsetTop = elm.offsetTop;
        document.querySelector('app-page-wrap .page-wrap').scrollTop = offsetTop - 72;
      }
    });


  }


  ngOnDestroy() {
    this.subs.unsubscribe();
    // console.log('window.pageYOffset', window.pageYOffset);
    // this.appService.profilesComponentScrollY = window.pageYOffset;
    // this.cards.nativeElement.style.transform = `translate(0, -${window.pageYOffset}px)`;
  }

  onSelect(profile: Profile) {
    this.appService.selectedProfileId = profile.id;
    this.router.navigate([profile.id], {relativeTo: this.activatedRoute});
  }

  onEdit(profile: Profile) {
    this.router.navigate([profile.id, 'edit'], {relativeTo: this.activatedRoute});
  }

  onEditImg(profile) {
    this.router.navigate([profile.id, 'edit', 'img'], {relativeTo: this.activatedRoute, state: {profileId: profile.id}});
  }

  onScrollIntoView(elm) {
    // elm.scrollIntoView();
  }

}

