import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss']
})
export class CardImgComponent implements OnInit {

  @Input() profile:any;
  imgLoaded: boolean;

  constructor() { }

  ngOnInit() {
  }

  onImgLoaded() {
    this.imgLoaded = true;
  }


}
