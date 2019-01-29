import {Injectable, Inject} from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfirmLeaveGuard implements CanDeactivate<any> {

  canDeactivate(target: any) {
    if (target.hasChanges) {
      return window.confirm('If you press ok you will lose your changes?');
    }
    return true;
  }

}
