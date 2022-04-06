import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLocationListPage } from './user-location-list';
const routes: Routes = [
  {
    path: '',
    component: UserLocationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLocationListPageRoutingModule {}
