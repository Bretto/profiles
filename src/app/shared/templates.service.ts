import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  templates = new Map();

  constructor() {

  }
}

