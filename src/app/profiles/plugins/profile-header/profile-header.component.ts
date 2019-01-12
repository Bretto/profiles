import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
    console.log('ProfileHeaderComponent');
  }

  ngOnInit() {
  }

  onBack() {
    this.router.navigate(['/auth'], {relativeTo: this.activatedRoute});
  }

}
