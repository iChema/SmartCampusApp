import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLocationDetailPage } from './user-location-detail';

const routes: Routes = [
  {
    path: '',
    component: UserLocationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLocationDetailPageRoutingModule { }
