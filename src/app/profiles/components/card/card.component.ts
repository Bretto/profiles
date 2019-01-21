import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../../main/app.service';
import {delay} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {

  @Input() profile;
  @Output() select_: EventEmitter<any> = new EventEmitter();
  @Output() scrollIntoView_: any = new EventEmitter();
  elm: any;
  imgLoaded: boolean;

  constructor(private elementRef: ElementRef,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private appService: AppService) {
  }

  ngOnInit() {
    this.elm = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {
    if (this.appService.selectedProfileId === this.profile.id) {
      this.scrollIntoView_.next(this.elm);
    }
  }

  onSelect() {
    if (!this.profile.deleted) this.select_.next(this.profile.id);
  }

  get fullName() {
    return `${this.profile.firstName}  ${this.profile.lastName}`;
  }

  onImgLoaded() {
    this.imgLoaded = true;
  }

  onEdit() {
    this.router.navigate([this.profile.id, 'edit'], {relativeTo: this.activatedRoute});
  }

}
