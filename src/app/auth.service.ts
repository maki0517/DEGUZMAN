import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
  ) {}

  getUser() {
    return this.afAuth.currentUser;
  }

  setAuthentication(auth: boolean) {
    if (auth) {
      localStorage.setItem('loggedIn', 'true');
    }
  }

  canActivate() {
    if (localStorage.getItem('loggedIn') == 'true') {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  async signUp(email: string, password: string, retypePassword: string) {
    if (!email || !password || !retypePassword) {
      this.presentAlert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== retypePassword) {
      this.presentAlert('Error', 'Password do not match');
      return;
    }

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.presentAlert('Success', 'Sign up successfull');
        this.router.navigate(['/login']);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.presentAlert('Registration Failed', errorMessage)
        console.error(error);
      });
  }

  async login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        this.setAuthentication(true);
        this.presentAlert('Success', 'Sign up successfull');
        this.router.navigate(['/dashboard']);
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.presentAlert('Login Failed', errorMessage)
        console.error(error);
      });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('loggedIn');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
