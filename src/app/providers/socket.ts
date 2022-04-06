import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { AlertController, ToastController } from '@ionic/angular';
import { UserData } from './user-data';
import { Scan } from './scan';

@Injectable({
    providedIn: 'root'
})
export class Socket {
    socket: any;
    scanning = false;
    username = null;

    constructor(
        private toastCtrl: ToastController,
        private scan: Scan,
        private userData: UserData,
        public alertController: AlertController
    ) { }

    start() {
        console.log(environment.urlServerSocket)
        this.socket = io(environment.urlServerSocket, {
            transports: ['websocket']
        })
        this.startScaning()
        console.log('empieza conexión');
        this.socket.on('connect', () => {
            this.userData.getUsername().then(username => {
                this.socket.emit('join', { id: username, type: 1 }, (error) => {
                    if (error) { } else { }
                });
            });
        });

        this.socket.on("disconnect", () => {
            console.log('disconnected from server');
        });

        this.socket.on('connect_error', (error) => {
            console.log('connect_error due to', error.message);
            this.scanning = false;
        });

        this.socket.on('setAgentsOnline', (list) => {
            if (list[0]) {
                console.log(list)
                console.log("Lista llena")
                this.userData.setAgentsOnlineList(list).then(() => {
                    this.scanning = true;
                })
            } else {
                console.log("Lista vacia")
                this.scanning = false;
            }
        });

        this.socket.on('setAgents', (list) => {
            console.log(list)
            this.userData.setAgentsList(list).then(() => {
            })
        });

        this.socket.on('setLocationUser', (list) => {
            console.log(list)
            this.userData.setUsersLocationList(list).then(() => {
            })
        });
    }


    startScaning() {
        setInterval(() => {
            //this.userData.getAgentOnlineList()
            if (this.scanning) {
                //this.socket.emit('getAgentsOnline')
                //this.socket.emit('getAgents')
                this.scan.start();
            }
        }, .5 * 60000);
    }

    here(agentId: String) {
        this.socket.emit('here', agentId)
    }
}