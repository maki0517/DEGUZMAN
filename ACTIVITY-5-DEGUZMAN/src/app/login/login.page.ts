import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccordionGroupCustomEvent, AlertController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authentication: AuthenticationService,
    private toastController: ToastController
  ) { }

  userName: string = "";
  userPass: string = "";

  accName = ['Admin', 'User'];
  accPass = ['admin123', 'user12345'];

  async login() {
    for (let up = 0; up < this.accName.length; up++) {
      if (this.userName == this.accName[up] && this.userPass == this.accPass[up]) 
      { 
        this.authentication.authentication = true;
        localStorage.setItem('username', this.userName);
       }
  }
    this.authentication
      .Load() // validating the load 
      .then (() => {
        this.loginSucc();
        this.router.navigate(['dashboard/home']);
      })
      .catch (() => 
      {
        return this.loginFailed();
      }); 
  }

  async loginSucc() {
    const alert = await this.alertController.create({
      header: 'Success',
      subHeader: 'Welcome',
      message: 'Welcome, ' + this.userName,
      buttons: ['OK']
    });
    await alert.present();
    setTimeout(() => {
    }, 1000)
  }

  async loginFailed() {
    const toast = await this.toastController.create({
      message: 'Login failed.',
      duration: 2500
    });
    toast.present();
  }


  ngOnInit() {
  }

}
