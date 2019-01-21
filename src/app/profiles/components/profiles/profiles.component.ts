import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProfilesCommands} from '../../profiles.commands';
import {ProfilesProjections} from '../../profiles.projections';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../../main/app.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit, OnDestroy {

  profiles$;
  subs: Subscription = new Subscription();

  @ViewChild('cards') cards: ElementRef;

  constructor(private profilesCommands: ProfilesCommands,
              private appService: AppService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private profilesProj: ProfilesProjections) {

    console.log('ProfilesComponent');

    this.profiles$ = profilesProj.queryAll$();
  }

  ngOnInit() {

    this.profilesCommands.queryAll({});
    // .subscribe(res => {
    //   // console.log('res', res);
    // }, err => {
    //
    // });
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
    // console.log('window.pageYOffset', window.pageYOffset);
    // this.appService.profilesComponentScrollY = window.pageYOffset;
    // this.cards.nativeElement.style.transform = `translate(0, -${window.pageYOffset}px)`;
  }

  onSelect(id) {
    this.appService.selectedProfileId = id;
    this.router.navigate([id], {relativeTo: this.activatedRoute});
  }

  onScrollIntoView(elm) {
    // elm.scrollIntoView();
  }

}

