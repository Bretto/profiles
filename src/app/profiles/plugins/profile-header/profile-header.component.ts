import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {RouterState} from '../../../main/utils';
import {UiProjection} from '../../../ui/store/ui.projections';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  backUrl: string;

  constructor(private router: Router,
              private uiProj: UiProjection,
              private activatedRoute: ActivatedRoute) {
    console.log('ProfileHeaderComponent');
  }

  ngOnInit() {
  }

  onBack() {


    this.uiProj.getState$<RouterState>(['router', 'state'])
      .pipe(first())
      .subscribe(state => {
        if (this.backUrl) {
          this.backUrl = this.backUrl.replace(':id', state.params.id);
          this.router.navigate([this.backUrl], {
            relativeTo: this.activatedRoute,
            // fragment: state.params.id
          });
        }
      });


    // if (previousRoute) {
    //   this.router.navigateByUrl(previousRoute);
    // } else {
    //   this.router.navigate(['/profile'], {relativeTo: this.activatedRoute});
    // }
  }

  onMenu() {

  }

}
