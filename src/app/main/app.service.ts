import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  selectedProfileId: string;
  headerIsVisible: boolean = true;
  animationDirection: number = 0;
  currentNav;

  constructor() {
  }
}
