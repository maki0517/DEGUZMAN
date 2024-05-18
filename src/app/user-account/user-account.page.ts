import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {
  user: any = null;
  isEditing: boolean = false;
  userEmail: string = '';
  username: string = '';
  phone: string = '';

  constructor() {}

  ngOnInit() {
    this.fetchUserDetails();
  }

  async fetchUserDetails() {
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);
    const emailFromLocalStorage = localStorage.getItem('email');

    if (emailFromLocalStorage) {
      const q = query(collection(db, 'users'), where('userEmail', '==', emailFromLocalStorage));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        this.user = userData;
        this.userEmail = userData['userEmail'];
        this.username = userData['username'];
        this.phone = userData['phone'];
      } else {
        console.error('No user found in Firestore for the provided email');
      }
    } else {
      console.error('No email found in local storage');
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  async saveUserDetails() {
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);
    const emailFromLocalStorage = localStorage.getItem('email');
  
    if (emailFromLocalStorage) {
      const q = query(collection(db, 'users'), where('userEmail', '==', emailFromLocalStorage));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].ref;
        await updateDoc(userDoc, {
          userEmail: this.userEmail,
          username: this.username,
          phone: this.phone,
        });
        this.isEditing = false;
        this.fetchUserDetails();
      } else {
        console.error('No user found in Firestore for the provided email');
      }
    } else {
      console.error('No email found in local storage');
    }
  }
}