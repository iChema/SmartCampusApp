import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserData } from '../../providers/user-data';
import * as moment from 'moment';

@Component({
  selector: 'page-user-location-detail',
  templateUrl: 'user-location-detail.html',
  styleUrls: ['./user-location-detail.scss'],
})
export class UserLocationDetailPage {
  user: any[] = [];

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public userData: UserData
  ) {}

  ionViewWillEnter() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.userData.getUsersLocationList().then((data: any[]) => {
      const userLocationId = this.route.snapshot.paramMap.get('userLocationId');
      const user = data.filter(function (data) { return data.user == userLocationId });
      user.sort((x, y) => new Date(y.updatedAt).getTime() - new Date(x.updatedAt).getTime());      
      for (var i in user) {
        user[i]['updatedAt'] = moment(user[i]['updatedAt']).format('LLL');
      }
      console.log(user);      
      this.user = [{user:userLocationId, datos:user}];
      this.user = this.user[0]
      console.log(this.user)
    })
  }
}
