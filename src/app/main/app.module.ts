import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NotFoundPageComponent} from '../not-found-page/not-found-page.component';
import {HomeComponent} from '../home/home.component';
import {SharedModule} from '../shared/shared.module';
import {reducers, metaReducers} from './app.store';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {MatProgressButtonsModule} from 'mat-progress-buttons';
import {AppEffects} from './app.effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {CustomRouterStateSerializer} from '../shared/utils';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestore} from 'angularfire2/firestore';
import {environment} from '../../environments/environment';
import {CustomReuseStrategy} from '../shared/custom-strategy';
import {RouteReuseStrategy} from '@angular/router';
import {firebaseConfig} from '../../environments/firebase-config';
import {AppInterceptor} from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([AppEffects]),
    MatProgressButtonsModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    AngularFirestore,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // TODO why can't I intercept the remote calls of angularFire2
    // console.log('http', http);
    // const url = 'https://jsonplaceholder.typicode.com/posts/1';
    // this.http.get(url, {observe: 'body'}).subscribe(x => {
    //   console.log('x', x);
    // });
  }
}
