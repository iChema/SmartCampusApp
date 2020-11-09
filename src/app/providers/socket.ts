import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';
import { UserData } from './user-data';
import { Scan } from './scan';

@Injectable({
  providedIn: 'root'
})
export class Socket {
    socket : any;
    scanning = false;
    
    constructor(
        private toastCtrl: ToastController,
        private scan : Scan,
        private userData: UserData
    ) {}

    start() {
        this.socket = io(environment.urlServerSocket);
        this.startScaning()
        console.log('empieza conexión');
        this.socket.on('connect', ()=> {
            this.userData.getUsername().then(username => {
                this.socket.emit('join', {curp:username,sala:1} , (error) => {
                    if (error) {} else {}
                });
            });
        });

        this.socket.on('connect_error', async (error) => {
           this.scanning = false;
        });

        this.socket.on('setAgentOnline', (list)=>{
            this.userData.setAgentsOnlineList(list).then(()=>{
                this.scanning = true;
            })
        });
    }

    startScaning()  {
        setInterval(()=>{
            if(this.scanning){ this.scan.start(); }
        }, 300000);
    }

    here(agentId : String){
        this.socket.emit('here', agentId)
    }
}