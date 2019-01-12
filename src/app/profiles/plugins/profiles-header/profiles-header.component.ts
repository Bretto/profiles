import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profiles-header',
  templateUrl: './profiles-header.component.html',
  styleUrls: ['./profiles-header.component.scss']
})
export class ProfilesHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onAdd() {
    console.log('on ADD');
  }

}
