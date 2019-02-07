import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/main/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function boot() {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

boot();

// const url = localStorage.getItem('url');
// if (url) {
//   if (location.pathname !== url) {
//     location.href = url;
//   } else {
//     boot();
//   }
// } else {
//   boot();
// }








