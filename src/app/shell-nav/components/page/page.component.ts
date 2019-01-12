import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  info;

  constructor(private route: ActivatedRoute) {
    console.log('PageComponent');
  }

  ngOnInit() {
    this.info = this.route.snapshot.params['pageId'];
  }

}

