import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserData } from '../../providers/user-data';
import * as moment from 'moment';

@Component({
  selector: 'page-agent-detail',
  templateUrl: 'agent-detail.html',
  styleUrls: ['./agent-detail.scss'],
})
export class AgentDetailPage {
  agent: any[] = [];
  dates: any[] = [];

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    private userData: UserData
  ) { }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.userData.getAgentsList().then((data: any[]) => {
      const agentId = this.route.snapshot.paramMap.get('agentId');
      //this.agent = data.filter(function (data) { return data._id == speakerId })[0];
      const agent = data.find(function (data) { return data._id == agentId });
      agent['dates'].sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime());
      console.log(agent);
      for (var i in agent['dates']) {
        agent['dates'][i]['date'] = moment.utc(agent['dates'][i]['date']).format('LLL');
      }
      console.log(agent);
      this.agent = agent;
      console.log(this.agent);
    })
  }
}
