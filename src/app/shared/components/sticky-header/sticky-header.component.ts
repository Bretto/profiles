import {distinctUntilChanged, filter, map, pairwise, share, startWith, tap, throttleTime} from 'rxjs/operators';
import {AfterViewInit, Component, EventEmitter, HostBinding, Input, NgZone, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/overlay';

const VisibilityState = {
  Visible: 'visible',
  Hidden: 'hidden'
};

const Direction = {
  Up: 'Up',
  Down: 'Down'
};

@Component({
  selector: 'app-sticky-header',
  template: `
    <ng-content></ng-content>`,
  styles: [
      `
      :host {
        z-index: 100;
        position: fixed;
        top: 0;
        width: 100%;
      }
    `
  ],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({opacity: '0', transform: 'translateY(-100%)'})
      ),
      state(
        VisibilityState.Visible,
        style({opacity: '1', transform: 'translateY(0)'})
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class StickyHeaderComponent implements AfterViewInit {

  isVisibleValue: boolean = true;
  @Output() isVisibleChange = new EventEmitter();

  @Input()
  get isVisible() {
    return this.isVisibleValue;
  }

  set isVisible(val) {
    this.isVisibleValue = val;
    this.isVisibleChange.emit(val);
  }

  @HostBinding('@toggle')
  get toggle() {
    return this.isVisibleValue ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  constructor(private scrollDispatcher: ScrollDispatcher, private zone: NgZone) {
    console.log('StickyHeaderComponent');
  }

  ngAfterViewInit() {

    const scroll$ = this.scrollDispatcher
      .scrolled()
      .pipe(
        filter(data => data instanceof CdkScrollable),
        map((data: CdkScrollable) => data.getElementRef() ? data.getElementRef().nativeElement.scrollTop || 0 : 0),
        throttleTime(100),
        pairwise(),
        map(([y1, y2]) => {
          y1 = y1 < 0 ? 0 : y1;
          y2 = y2 < 0 ? 0 : y2;
          return (y2 <= y1 ? Direction.Up : Direction.Down);
        }),
        distinctUntilChanged(),
        startWith(Direction.Up),
        share()
      );

    const scrollUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const scrollDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    scrollUp$.subscribe(() => {
      this.zone.run(_ => {
        this.isVisible = true;
      });
    });

    scrollDown$.subscribe(() => {
      this.zone.run(_ => {
        this.isVisible = false;
      });
    });
  }
}


