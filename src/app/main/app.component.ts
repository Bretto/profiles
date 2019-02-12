import {Component} from '@angular/core';
import {UiCommands} from '../ui/ui.commands';
import {UiProjection} from '../ui/ui.projections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private uiProj: UiProjection) {

    this.uiProj.getUrl$().subscribe(url => {
      localStorage.setItem('url', url);
    });

    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    }
// Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator[`standalone`]);

// Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      //this.setState({ showInstallMessage: true });
      // alert('showInstallMessage');
    }

  }



}


