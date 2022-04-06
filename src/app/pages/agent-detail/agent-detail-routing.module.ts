import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgentDetailPage } from './agent-detail';

const routes: Routes = [
  {
    path: '',
    component: AgentDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentDetailPageRoutingModule { }
