
import { Component, ViewChild } from '@angular/core';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-agent-list',
  templateUrl: 'agent-list.html',
  styleUrls: ['./agent-list.scss'],
})
export class AgentListPage {
  agents: any[] = [];
  constructor(private userData: UserData) { }

  ionViewDidEnter() {
    this.cargarAgentes();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.cargarAgentes();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  cargarAgentes() {
    this.userData.getAgentsList().then((list: any[]) => {
      const agents = list;
      console.log(agents)
      //Ordenar por edificio y aula
      agents.sort(function (x, y) {
        var n = x.build.localeCompare(y.build);
        if (n !== 0) {
          return n;
        }
        return x.location.localeCompare(y.location);
      });
      var build = agents.map(function (agent) { return agent.build; });
      var sorted = build.sort();
      var builds = sorted.filter(function (value, index) {
        return value !== sorted[index + 1];
      });
      var agentsOnline = []
      var agentsOffline = []
      for (var i = 0; i < builds.length; i++) {
        var agentsTemp = []
        var agentsOnlineTemp = []
        var agentsOfflineTemp = []
        agentsTemp = agents.filter(function (data) { return data.build == builds[i] })
        agentsOnlineTemp = agentsTemp.filter(function (data) { return data.status == 'online' })
        agentsOfflineTemp = agentsTemp.filter(function (data) { return data.status == 'offline' })
        if (agentsOnlineTemp.length > 0) {
          agentsOnline.push({ 'build': builds[i], 'agents': agentsOnlineTemp })
        }
        if (agentsOfflineTemp.length > 0) {
          agentsOffline.push({ 'build': builds[i], 'agents': agentsOfflineTemp })
        }
      }
      this.agents = [];
      this.agents.push({ 'status': 'Online', 'builds': agentsOnline })
      this.agents.push({ 'status': 'Offline', 'builds': agentsOffline })
      console.log(this.agents)
    })
  }
}
