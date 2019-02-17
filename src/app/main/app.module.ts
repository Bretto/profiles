import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {MatProgressButtonsModule} from 'mat-progress-buttons';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../../environments/environment';
import {RouteReuseStrategy} from '@angular/router';
import {AppInterceptor} from './app.interceptor';
import {UserModule} from '../user/user.module';
import {CustomRouterStateSerializer} from './utils';
import {CustomReuseStrategy} from './custom-strategy';
import {UiModule} from '../ui/ui.module';
import {AppComponent} from './components/app/app.component';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {HomeComponent} from './components/home/home.component';
import {AppEffects} from './store/app.effects';
import {reducers, metaReducers} from './store/app.store';
import {FireModule} from '../fire/fire.module';

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
    UserModule,
    UiModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([AppEffects]),
    MatProgressButtonsModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FireModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(httpClient: HttpClient) {
    // TODO why can't I intercept the remote calls of angularFire2 fuck !!!

    // const url = 'https://jsonplaceholder.typicode.com/posts/1';
    // httpClient.get(url, {observe: 'body'}).subscribe(x => {
    //   console.log('XXX', x);
    // });
  }
}
