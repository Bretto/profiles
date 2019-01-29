import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Profile} from '../../profile.model';

@Component({
  selector: 'app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss']
})
export class CardImgComponent implements OnInit {

  @Input() profile: Profile;
  imgLoaded: boolean;

  @Output() edit_: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onImgLoaded() {
    this.imgLoaded = true;
  }

  onEdit(e) {
    this.edit_.emit(e);
  }

  get picUrl() {
    return this.profile.pic;//this.profile.pic ? this.profile.pic : 'assets/images/default.jpg';
  }


}
