import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotificationListPage } from './notification-list';
const routes: Routes = [
  {
    path: '',
    component: NotificationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationListPageRoutingModule {}
