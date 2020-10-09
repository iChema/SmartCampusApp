import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NotificationListPage } from './notification-list';
import { NotificationListPageRoutingModule } from './notification-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NotificationListPageRoutingModule
  ],
  declarations: [NotificationListPage],
})
export class NotificationListModule {}
