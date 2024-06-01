import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Address } from './admin/admin.model';
import { iAddress } from './admin/admin.model';
import { addDoc, collection, getFirestore, getDocs, updateDoc, setDoc, doc, deleteDoc, getDoc} from "firebase/firestore"
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, 
  User
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  newAddressList: iAddress[] = [];
  addresses: Address = new Address();
  currentUser: User | null = null;
  private carType = new BehaviorSubject<string[]>([]);
  currentCarType = this.carType.asObservable();

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) {
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
    });
  }

  getUser(): User | null {
    const auth = getAuth();
    return auth.currentUser;
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


  async signUp(email: string, password: string, retypePassword: string, userType: string, phNo: string, carType: string, username: string) {
    if (!email || !password || !retypePassword) {
      this.presentAlert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== retypePassword) {
      this.presentAlert('Error', 'Password do not match');
      return;
    }
  
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const firestore = getFirestore();

      if(userType == 'driver'){
        await addDoc(collection(firestore, 'users'), {
          uid: user.uid,
          email,
          username,
          userType,
          phNo,
          carType,
          available: true 
        });
      } else {
        await addDoc(collection(firestore, 'users'), {
          uid: user.uid,
          email,
          username,
          userType,
          phNo,
        });
      }
  
      this.presentAlert('Success', 'Sign up successful');
      this.router.navigate(['/login']);
    } catch (error) {
    }
  }


  async login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        if (email === 'onlyadmin@email.com' && password === 'adminOnly') {
          // Admin acc
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          this.setAuthentication(true);
          this.presentAlert('Success', 'Admin sign in successful');
          this.router.navigate(['/admin']);
        } else {
          // Regular user acc
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          this.setAuthentication(true);
          this.presentAlert('Success', 'Sign in successful');
          this.router.navigate(['tabs/dashboard']);
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
      const docRef = doc(firestore, "address", address.id);
      await updateDoc(docRef, {title: address.title, place: address.place});
    } catch(e) {
      console.error("Error update document: ", e);
    }
  }

  async tryDelete(address: Address) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, "address", address.id)
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Delete error: ", e);
    }
  }

  changeCarType(type: string[]) {
    this.carType.next(type);
  }

  async getDriverData(userId: string): Promise<any> {
    const db = getFirestore();
    const userDoc = doc(db, "users", userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('No such document!');
    }
  }

}


