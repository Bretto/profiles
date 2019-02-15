import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IProfile} from '../../profile.model';
import {UiProjection} from '../../../ui/store/ui.projections';
import {RouterState} from '../../../main/app.model';

@Component({
  selector: 'app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss']
})
export class CardImgComponent implements OnInit, AfterViewInit {

  @Input() profile: IProfile;
  imgLoaded: boolean;
  hideEdit: boolean;

  @ViewChild('pincher') pincher: any;
  @ViewChild('img') img: ElementRef;
  @ViewChild('preloader') preloader: ElementRef;
  @Output() edit_: EventEmitter<any> = new EventEmitter();

  elm: any;
  parentElm: any;

  constructor(private uiProj: UiProjection) {

    this.uiProj.getState$<RouterState>(['router', 'state']).subscribe(state => {
      if (state.path === '/profile/:id/edit/img') {
        this.hideEdit = true;
      }
    });

  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    const io = new IntersectionObserver((entries: any, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = this.img.nativeElement;
          const src = img.getAttribute('data-lazy');
          img.setAttribute('src', src);
          img.classList.add('fade');
          observer.disconnect();
        }
      });
    });

    io.observe(this.preloader.nativeElement);
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
