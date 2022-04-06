import { Injectable, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { AlertController } from '@ionic/angular';
import { UserData } from './user-data';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Injectable({
    providedIn: 'root'
})
export class Scan {
    devices: any[] = [];
    socket = null

    constructor(
        private ble: BLE,
        private ngZone: NgZone,
        private userData: UserData,
        public alertController: AlertController,
        public bluetoothSerial: BluetoothSerial
    ) { }

    start() {
        this.devices = [];
        /*
        const device = [];
        this.checkAgentList(device);
        */
        //this.socket.here('dc:a6:32:aa:1f:0f');
        /*
        this.ble.scan([],20).subscribe(device => {   
            this.onDeviceDiscovered(device)
        });
        */
        this.startScanning();

    }

    startScanning() {
        this.bluetoothSerial.discoverUnpaired().then((success) => {
            success.forEach((value, key) => {
                this.onDeviceDiscovered(value);
            });
        }, (err) => { console.log(err); });
    }

    onDeviceDiscovered(device) {
        this.ngZone.run(() => {
            this.devices.push(device);
            this.checkAgentList(device)
        });
    }

    checkAgentList(device) {
        this.userData.getAgentOnlineList().then((list)=>{
            list.forEach((agentId,index)=>{
                if (agentId == device.id) {
                    this.socket.here(agentId);
                    return;
                }
            })
        })
    }
}