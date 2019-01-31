import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Profile} from '../../profile.model';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss']
})
export class CardImgComponent implements OnInit {

  @Input() profile: Profile;
  imgLoaded: boolean;

  @ViewChild('pincher') pincher: any;
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

  onZoom(e) {

    const elm = this.pincher.elementRef.nativeElement;
    if (e.type === 'pinch') {
      elm.classList.add('fullscreen');
    }

    if (e.type === 'touchend') {
      elm.classList.remove('fullscreen');
    }
  }

  get picUrl() {
    return this.profile.pic;//this.profile.pic ? this.profile.pic : 'assets/images/default.jpg';
  }


}
