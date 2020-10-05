/* 
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FcmService } from '../../services/fcm.service';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html',
  styleUrls: ['./notification-list.scss']
})
export class NotificationListPage {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    private toastr: ToastService

  ) {
    this.initializeApp();
  }



  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        console.log('');
        if (this.platform.is('ios')) {
          this.toastr.presentToast(msg.aps.alert);
        } else {
          this.toastr.presentToast(msg.body);
        }
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }
}
*/

  
import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html',
  styleUrls: ['./notification-list.scss']
})
export class NotificationListPage {
  pushes: any = [];
  constructor(private fcm: FCM, public plt: Platform) {
    this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log(data)
            console.log("Received in background");
            this.pushes.push({
              body: data.body,
              title: data.title
            })
            console.log(this.pushes)
          } else {
            console.log(data)
            console.log("Received in foreground");
            this.pushes.push({
              body: data.body,
              title: data.title
            })
            console.log(this.pushes)
          };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      })
  }
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }
}
