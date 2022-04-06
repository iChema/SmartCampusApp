import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AgentListPage } from './agent-list';
import { AgentListPageRoutingModule } from './agent-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AgentListPageRoutingModule
  ],
  declarations: [AgentListPage],
})
export class AgentListModule {}
