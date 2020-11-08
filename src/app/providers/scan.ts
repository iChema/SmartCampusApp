import { Injectable , NgZone } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { UserData } from './user-data';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Scan {
    devices:any[] = [];
    
    constructor(
        private ble : BLE,
        private ngZone: NgZone,
        private toastCtrl: ToastController,
        private bluetoothSerial: BluetoothSerial,
        private userData: UserData,
        public alertController: AlertController,
    ) {}

    start() {
        /*this.bluetoothSerial.setDiscoverable(20);
        this.bluetoothSerial.isEnabled().then(async ()=>{
            const toast = await this.toastCtrl.create({
                message: "Esta enable el BT",
                position: 'bottom',
                duration: 3000
              });
        
              await toast.present(); 
        }).catch( async ()=>{
            const toast = await this.toastCtrl.create({
                message: 'No jalo el BT',
                position: 'bottom',
                duration: 3000
              });
        
              await toast.present(); 
        })*/
        this.devices = [];
        this.ble.startScan([]).subscribe(device => {
            this.onDeviceDiscovered(device)
            /*this.ble.connect(device.id).subscribe(async device =>{
                if (device.advertising 
                    && device.advertising.kCBAdvDataServiceData 
                    && device.advertising.kCBAdvDataServiceData["180A"]) {
                
                    var serviceData = new Uint8Array(device.advertising.kCBAdvDataServiceData["180A"]);
                
                    // print out the bytes
                    for (var i = 0; i < serviceData.length; i++) {
                        const alert = await this.alertController.create({
                            cssClass: 'my-custom-class',
                            header: 'Alert',
                            subHeader: 'Subtitle',
                            message: serviceData[i].toString(16),
                            buttons: ['OK']
                          });
                      
                          await alert.present();
                    }
                
                }
            });*/
        });
    }

    onDeviceDiscovered(device){
        this.ngZone.run(async ()=>{
            this.devices.push(device);
        });
    }

}