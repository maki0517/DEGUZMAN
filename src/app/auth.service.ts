import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Address } from './admin/admin.model';
import { iAddress } from './admin/admin.model';
import { addDoc, collection, getFirestore, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';

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
  newAddressList: iAddress[] = [];
  addresses: Address = new Address();
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
  
        if (email === 'onlyadmin@email.com' && password === 'adminOnly') {
          // Admin acc
          this.setAuthentication(true);
          this.presentAlert('Success', 'Admin sign in successful');
          this.router.navigate(['/admin']);
        } else {
          // Regular user acc
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          this.setAuthentication(true);
          this.presentAlert('Success', 'Sign in successful');
          this.router.navigate(['/dashboard']);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.presentAlert('Login Failed', errorMessage);
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
  async getAddress(): Promise<iAddress[]> {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    const users: Address[] = [];
    const querySnapshot = await getDocs (collection(firestore, "addresses"));
    querySnapshot.forEach((doc) => {
      const user = doc.data() as Address;
      user.id = doc.id;
      users.push(user);
    });
    return users;
  }

  async tryAdd(address: Address) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRefM1 = await addDoc(collection(firestore, "address"), {
        title: address.title,
        place: address.place
      });
      console.log("Document written with ID: ", docRefM1.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async tryUpdate(address: Address) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, "addresses", address.id);
      await updateDoc(docRef, {title: address.title, place: address.place});
    } catch(e) {
      console.error("Error update document: ", e);
    }
  }

  async tryDelete(address: Address) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, "addresses", address.id)
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Delete error: ", e);
    }
  }

}


