import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  /* When angular serviceWorker doesn't register itself in v7 and v8 then following code can be used to regsiter it.
  Another way to register is set the 'registrationStrategy' to registerImmediately while registering serviceWorker in AppModule */
  // .then(() => {
  //   debugger;
  //   if ('serviceWorker' in navigator && environment.production) {
  //     navigator.serviceWorker.register('/ngsw-worker.js');
  //   }
  // })
  .catch(err => console.log(err));
