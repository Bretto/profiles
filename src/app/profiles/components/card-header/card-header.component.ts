import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProfile} from '../../profile.model';
import {UiProjection} from '../../../ui/ui.projections';

@Component({
  selector: 'app-card-header',
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.scss']
})
export class CardHeaderComponent implements OnInit {

  @Input() profile: IProfile;
  @Output() edit_: EventEmitter<IProfile> = new EventEmitter();
  hideEdit: boolean;

  constructor(private uiProj: UiProjection) {

    uiProj.getRouterState().subscribe(state => {
      if (state.path === '/profile/:id/edit' || state.path === '/profile/:id/edit/img') {
        this.hideEdit = true;
      }
    });
  }

  ngOnInit() {
  }

  onEdit(e) {
    this.edit_.emit(e);
  }

}


