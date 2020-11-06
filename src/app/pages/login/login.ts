import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { UserData } from '../../providers/user-data';
import { Socket } from '../../providers/socket';
import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public menu: MenuController,
    public userData: UserData,
    public router: Router,
    public socket: Socket
  ) { 
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
    this.socket.start();
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl('/app/tabs/schedule', { replaceUrl: true });
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
