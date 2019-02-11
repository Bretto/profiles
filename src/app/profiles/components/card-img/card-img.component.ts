import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IProfile} from '../../profile.model';
import {UiProjection} from '../../../ui/ui.projections';

@Component({
  selector: 'app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss']
})
export class CardImgComponent implements OnInit {

  @Input() profile: IProfile;
  imgLoaded: boolean;
  hideEdit: boolean;

  @ViewChild('pincher') pincher: any;
  @Output() edit_: EventEmitter<any> = new EventEmitter();

  elm: any;
  parentElm: any;

  constructor(private uiProj: UiProjection) {

    uiProj.getRouterState().subscribe(state => {
      if (state.path === '/profile/:id/edit/img') {
        this.hideEdit = true;
      }
    });

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

    if (!this.elm && !this.parentElm) {
      this.elm = this.pincher.elementRef.nativeElement;
      this.parentElm = this.elm.parentElement;
    }

    if (e.type === 'pinch') {
      this.elm.classList.add('fullscreen');
      document.body.appendChild(this.elm);
    }

    if (e.type === 'touchend') {
      this.elm.classList.remove('fullscreen');
      this.parentElm.appendChild(this.elm);
    }
  }

  get picUrl() {
    return this.profile.pic.source;
  }

}
