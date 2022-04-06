import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgentListPage } from './agent-list';
const routes: Routes = [
  {
    path: '',
    component: AgentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentListPageRoutingModule {}
