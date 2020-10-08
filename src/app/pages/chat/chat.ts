import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';
import { Socket } from '../../providers/socket';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.html',
  styleUrls: ['chat.scss'],
})


export class ChatPage {
  public myUserId: string;
  chats = [];
  // tslint:disable-next-line:variable-name
  chat_input: string;

  constructor(public navCtrl: NavController, public socket: Socket) {

    this.Receive();
  }

  send(msg) {
    // tslint:disable-next-line:triple-equals
    if (msg != '') {
      // Assign user typed message along with generated user id
      const saltedMsg = this.myUserId + '#' + msg;
      // Push the message through socket
      this.socket.socket.emit('message', saltedMsg);
    }
    this.chat_input = '';
  }

  ReceiveHi() {
    // Socket receiving method
    this.socket.socket.emit('new user', this.myUserId , (data) => {
      if (data) {
        console.log(data);
      } else {
        console.log('Estas dos veces el mismo');
      }
    });
  }

  Receive() {
    // Socket receiving method
    this.socket.socket.on('message', (msg) => {
      // separate the salted message with "#" tag
      const saletdMsgArr = msg.split('#');
      let item = {};
      // check the sender id and change the style class
      // tslint:disable-next-line:triple-equals
      if (saletdMsgArr[0] == this.myUserId) {
        item = { styleClass: 'chat-message right', msgStr: saletdMsgArr[1] };
      } else {
        item = { styleClass: 'chat-message left', msgStr: saletdMsgArr[1] };
      }
      // push the bind object to array
      // Final chats array will iterate in the view
      this.chats.push(item);
    });
  }
}