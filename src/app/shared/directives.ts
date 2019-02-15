import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {of} from 'rxjs';
import {UiProjection} from '../ui/store/ui.projections';


@Directive({selector: '[OnLoad]'})
export class OnLoadDirective implements AfterViewInit {
  @Output() imageLoaded: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    of(window.getComputedStyle(this.el.nativeElement).backgroundImage)
      .subscribe(style => {
        if (style) {
          this.imageLoaded.emit(true);
        }
      });
  }
}

@Directive({
  selector: '[dropZone]'
})
export class DropZoneDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() {
  }

  @HostListener('drop', ['$event'])
  onDrop($event) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

}


@Directive({
  selector: '[auth-role]'
})
export class AuthRoleDirective {

  constructor(private el: ElementRef, private uiProj: UiProjection) {

    this.uiProj.getState$<User>(['user', 'auth'])
      .subscribe(user => {
        if (user) {
          el.nativeElement.style.visibility = 'initial';
        } else {
          el.nativeElement.style.visibility = 'hidden';
        }
      });
  }
}
