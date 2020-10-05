import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';

import { FcmService } from './services/fcm.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { ToastService } from './services/toast.service';

const config = {
  apiKey: "AIzaSyC_gGvTuqXQDxDWSkU3HBCgOZ-RtxSAhCM",
  authDomain: "smartcampusdb-afee9.firebaseapp.com",
  databaseURL: "https://smartcampusdb-afee9.firebaseio.com",
  projectId: "smartcampusdb-afee9",
  storageBucket: "smartcampusdb-afee9.appspot.com",
  messagingSenderId: "689776417256",
  appId: "1:689776417256:web:cf1a521199f898ec60ac5d",
  measurementId: "G-VT3RKN31SE"
};

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    InAppBrowser,
    SplashScreen,
    StatusBar,
    Firebase, 
    FCM,
    FcmService,
    ToastService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
