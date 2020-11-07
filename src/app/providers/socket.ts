import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';
import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class Socket {
    socket : any;
    
    constructor(
        private toastCtrl: ToastController,
        private userData: UserData
    ) {}

    start() {
        this.socket = io(environment.urlServerSocket);
        console.log('empieza conexión');
        this.socket.on('connect', ()=> {
            this.userData.getUsername().then(username => {
                this.socket.emit('join', {curp:username,sala:1} , (error) => {
                    if (error) {} else {}
                });
            });
        });

        this.socket.on('connect_error', async () => {
            const toast = await this.toastCtrl.create({
                message: 'Error en conexión con Socket',
                position: 'bottom',
                duration: 2000
              });
        
              await toast.present();
        });

        this.socket.on('setAgentOnline', (list)=>{
            this.userData.setAgentsOnlineList(list).then(()=>{
                console.log('guardado');
            })
        });
    }
}