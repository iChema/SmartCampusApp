import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentDetailPage } from './agent-detail';
import { AgentDetailPageRoutingModule } from './agent-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AgentDetailPageRoutingModule
  ],
  declarations: [
    AgentDetailPage,
  ]
})
export class AgentDetailModule { }
