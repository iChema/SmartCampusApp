import { Component, NgZone } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { BLE } from '@ionic-native/ble/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html',
  styleUrls: ['./notification-list.scss']
})

export class NotificationListPage {

  unpairedDevices: any;
  pairedDevices: any;
  gettingDevices: boolean;

  devices: any[] = [];

  mac_BT: string = "a";
  mac_WIFI: string = "b";
  uuii: string = "willian joto";

  constructor(
    private localNotifications: LocalNotifications,
    private device: Device,
    public alertController: AlertController,
    private ble: BLE,
    private ngZone: NgZone,
    private bluetoothSerial: BluetoothSerial

  ) {
    //this.mac_BT=this.device.bt_address;
    //this.mac_WIFI=this.device.wifi_address;
    this.uuii = this.device.uuid;
    bluetoothSerial.enable();
  }

  registerNotification(seconds: number) {
    this.localNotifications.schedule({
      title: `my ${seconds} notification`,
      text: `my detailed description`,
      trigger: {
        in: seconds,
        unit: ELocalNotificationTriggerUnit.SECOND,
      },
      foreground: true
    });
  }

  registerNotification2() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Single Local Notification',
      data: { secret: 'secret' },
      foreground: true
    });
  }

  async presentAlert() {
    this.bluetoothSerial.setDiscoverable(20);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      //message: this.device.bt_address,
      buttons: ['OK']
    });

    await alert.present();
  }

  Scan() {
    this.devices = [];
    this.ble.scan([], 15).subscribe(
      device => this.onDeviceDiscovered(device)
    );
  }
  onDeviceDiscovered(device) {
    console.log('Discovered' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device)
      console.log(device)
    })
  }

  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    const unPair = [];
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      success.forEach((value, key) => {
        var exists = false;
        unPair.forEach((val2, i) => {
          if (value.id === val2.id) {
            exists = true;
          }
        });
        if (exists === false && value.id !== '') {
          unPair.push(value);
        }
      });
      this.unpairedDevices = unPair;
      this.gettingDevices = false;
    },
      (err) => {
        console.log(err);
      });

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      });
  }

  success = (data) => {
    this.deviceConnected();
  }
  fail = (error) => {
    alert(error);
  }

  async selectDevice(id: any) {

    const alert = await this.alertController.create({
      header: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(id).subscribe(this.success, this.fail);
          }
        }
      ]
    });
    await alert.present();
  }

  deviceConnected() {
    this.bluetoothSerial.isConnected().then(success => {
      alert('Connected Successfullly');
    }, error => {
      alert('error' + JSON.stringify(error));
    });
  }

  async disconnect() {
    const alert = await this.alertController.create({
      header: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    await alert.present();
  }

}