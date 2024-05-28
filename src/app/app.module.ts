import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { initializeApp } from 'firebase/app';

@NgModule({
  declarations: [AppComponent],

  imports: [
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),

      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],

  bootstrap: [AppComponent],
})
export class AppModule {
  app = initializeApp(environment.firebaseConfig);
}
