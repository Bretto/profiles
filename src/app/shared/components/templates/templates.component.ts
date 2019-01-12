import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TemplatesService} from '../../templates.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, AfterViewInit {

  @ViewChild('profileEdit') profileEditTemplate;

  constructor(private templatesService: TemplatesService) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.templatesService.templates.set('profileEdit', this.profileEditTemplate);
  }

}
