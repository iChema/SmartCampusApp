import { Component } from '@angular/core';
import * as moment from 'moment';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-user-location-list',
  templateUrl: 'user-location-list.html',
  styleUrls: ['./user-location-list.scss'],
})
export class UserLocationListPage {
  usersLocation: any[] = [];

  constructor(private userData: UserData) { }

  ionViewDidEnter() {
this.cargarUsuarios();
  }
  cargarUsuarios(){
    this.userData.getUsersLocationList().then((list: any[]) => {
      const usersLocation = list;
      usersLocation.sort((x, y) => x.user.localeCompare(y.user));
      //usersLocation.sort((x, y) => new Date(y.updatedAt).getTime() - new Date(x.updatedAt).getTime());
      /*
      usersLocation.sort(function (x, y) {
        var n = new Date(y.updatedAt).getTime() - new Date(x.updatedAt).getTime();
        if (n !== 0) {
          return n;
        }
        return x.user.localeCompare(y.user);
      });
      for (var j in usersLocation) {
        usersLocation[j]['updatedAt'] = moment(usersLocation[j]['updatedAt']).format('LLL');
      }
      */
      var user = usersLocation.map(function (data) { return data.user; });
      var sorted = user.sort();
      var users = sorted.filter(function (value, index) {
        return value !== sorted[index + 1];
      });
      var userLocation = []
      for (var i = 0; i < users.length; i++) {
        var userLocationTemp = []
        userLocationTemp = usersLocation.filter(function (data) { return data.user == users[i] })
        userLocation.push({ 'user': users[i], 'locations':userLocationTemp })
      }
      console.log(userLocation)
      this.usersLocation = userLocation
    })
  }
}
