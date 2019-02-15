import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {IProfile} from '../../profile.model';
import {first} from 'rxjs/operators';
import {RouterState} from '../../../main/utils';
import {ProfilesCommands} from '../../store/profiles.commands';
import {UiProjection} from '../../../ui/store/ui.projections';
import {ProfilesProjections} from '../../store/profiles.projections';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit, OnDestroy, AfterViewInit {

  profiles$: Observable<IProfile[]>;
  profiles: IProfile[];
  subs: Subscription = new Subscription();

  constructor(private profilesCommands: ProfilesCommands,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private uiProj: UiProjection,
              private profilesProj: ProfilesProjections) {

    console.log('ProfilesComponent');

    this.profiles$ = profilesProj.queryAll$();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    // scroll back to last position
    this.uiProj.getState$<RouterState>(['router', 'state'])
      .pipe(first()).subscribe((state: RouterState) => {
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

  onSelect(profile: IProfile) {
    this.router.navigate([profile.id], {relativeTo: this.activatedRoute});
  }

  onEdit(profile: IProfile) {
    this.router.navigate([profile.id, 'edit'], {relativeTo: this.activatedRoute});
  }

  onEditImg(profile) {
    this.router.navigate([profile.id, 'edit', 'img'], {relativeTo: this.activatedRoute, state: {profileId: profile.id}});
  }

  onScrollIntoView(elm) {
    // elm.scrollIntoView();
  }

  trackElement(index: number, element: IProfile) {
    return element ? element.id : null;
  }

}

