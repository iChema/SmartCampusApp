
import { Component } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html',
  styleUrls: ['./notification-list.scss']
})

export class NotificationListPage {

  constructor(private localNotifications: LocalNotifications) {

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

}