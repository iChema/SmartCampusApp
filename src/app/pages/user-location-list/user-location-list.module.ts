import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UserLocationListPage } from './user-location-list';
import { UserLocationListPageRoutingModule } from './user-location-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UserLocationListPageRoutingModule
  ],
  declarations: [UserLocationListPage],
})
export class UserLocationListModule {}
