import { Injectable , NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { UserData } from './user-data';
import { Socket } from './socket';

@Injectable({
  providedIn: 'root'
})
export class Scan {
    devices:any[] = [];
    
    constructor(
        private ble : BLE,
        private ngZone: NgZone,
        private socket : Socket,
        private userData: UserData
    ) {}

    start() {
        this.devices = [];
        this.ble.scan([],20).subscribe(device => {
            this.onDeviceDiscovered(device)
        });
    }

    onDeviceDiscovered(device){
        this.ngZone.run(()=>{
            this.devices.push(device);
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