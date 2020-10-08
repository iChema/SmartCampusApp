import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Socket {
    socket : any;
    
    constructor() {}

    connect() {
        this.socket = io(environment.urlServerSocket);
        this.socket.on('connect', ()=> {
            this.socket.emit('join', {curp:'12345678',sala:1} , (error) => {
                if (error) {} else {}
            });
        });
    }
}