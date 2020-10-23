
import { Component } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html',
  styleUrls: ['./notification-list.scss']
})

export class NotificationListPage {
  mac_BT: string="a";
  mac_WIFI: string="b";
  uuii:string = "willian joto";

  constructor(private localNotifications: LocalNotifications, private device: Device, public alertController: AlertController) {
    this.mac_BT=this.device.bt_address;
    this.mac_WIFI=this.device.wifi_address;
    this.uuii = this.device.uuid;
  }

  registerNotification(seconds: number) {
    this.localNotifications.schedule({
      title: `my ${seconds} notification`,
      text: `my detailed description`,
      trigger: {
        in: seconds,
        unit: ELocalNotificationTriggerUnit.SECOND,
      },
      foreground: true
    });
  }

  registerNotification2() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Single Local Notification',
      data: { secret: 'secret' },
      foreground: true
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: this.device.bt_address,
      buttons: ['OK']
    });

    await alert.present();
  }
}