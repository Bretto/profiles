import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss']
})
export class CardImgComponent implements OnInit {

  @Input() profile: any;
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


}
