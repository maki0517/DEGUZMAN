import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async signUp(email: string, password: string, retypePassword: string) {
    if (!email || !password || !retypePassword) {
      await this.presentAlert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== retypePassword) {
      await this.presentAlert('Error', 'Passwords do not match');
      return;
    }

    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await this.presentAlert('Success', 'Sign up successful');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Sign up error:', error);
      await this.presentAlert('Error', 'Sign up failed');
    }
  }

  async login(email: string, password: string) {
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.setAuthentication(true);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('email', email); // Save email
      await this.presentAlert('Success', 'Login successful');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Login error:', error);
      await this.presentAlert('Error', 'Login failed');
      throw error;
    }
  }

  setAuthentication(auth: boolean) {
    if (auth) {
      localStorage.setItem('loggedIn', 'true');
    }
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
    try {
      const auth = getAuth(); // Get the Auth instance
      await signOut(auth); // Call signOut method on the Auth instance
      console.log('Logged out successfully');
      localStorage.removeItem('loggedIn'); // Remove the loggedIn flag from localStorage
      this.router.navigate(['/login']); // Redirect to the login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
