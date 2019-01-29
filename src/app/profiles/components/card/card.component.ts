import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../../main/app.service';
import {delay} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from '../../profile.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {

  @Input() profile: Profile;
  @Output() select_: EventEmitter<Profile> = new EventEmitter();
  @Output() edit_: EventEmitter<Profile> = new EventEmitter();
  @Output() editImg_: EventEmitter<Profile> = new EventEmitter();
  @Output() scrollIntoView_: EventEmitter<any> = new EventEmitter();
  elm: any;

  constructor(private elementRef: ElementRef,
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
    if (!this.profile.deleted) {
      this.select_.next(this.profile);
    }
  }

  get fullName() {
    return `${this.profile.firstName}  ${this.profile.lastName}`;
  }

  onEdit(e) {
    e.stopImmediatePropagation();
    this.edit_.emit(this.profile);
  }

  onEditImg(e) {
    e.stopImmediatePropagation();
    this.editImg_.emit(this.profile);
  }

}


