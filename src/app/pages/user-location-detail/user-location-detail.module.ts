import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLocationDetailPage } from './user-location-detail';
import { UserLocationDetailPageRoutingModule } from './user-location-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UserLocationDetailPageRoutingModule
  ],
  declarations: [
    UserLocationDetailPage,
  ]
})
export class UserLocationDetailModule { }
