import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../../main/app.service';
import {IProfile} from '../../profile.model';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit, AfterViewInit {

  @Input() profile: IProfile;
  @Output() select_: EventEmitter<IProfile> = new EventEmitter();
  @Output() edit_: EventEmitter<IProfile> = new EventEmitter();
  @Output() editImg_: EventEmitter<IProfile> = new EventEmitter();
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

  onSelect(e) {
    e.stopImmediatePropagation();
    if (!this.profile.deleted) {
      this.select_.next(this.profile);
    }
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



