import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-complete-info',
  templateUrl: 'complete-info.page.html',
  styleUrls: ['complete-info.page.scss'],
})
export class CompleteInfoPage {
  selectedDateTime: string = '';
  selectedDriver: string = '';
  pickUpLocation: string = '';
  dropOffLocation: string = '';
  username: string = '';
  usernumber: string = '';
  drivername: string = '';
  drivernumber: string = '';
  loggedInUserEmail: string = '';

  constructor(private router: Router) {
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime;
    this.selectedDriver = state.selectedDriver;
    this.pickUpLocation = state.pickUpLocation;
    this.dropOffLocation = state.dropOffLocation;

    this.loggedInUserEmail = localStorage.getItem('email') || '';
    this.fetchUserInfo(this.loggedInUserEmail);

    this.fetchDriverInfo(this.selectedDriver);
  }

  async fetchUserInfo(loggedInUserEmail: string | null) {
    if (!loggedInUserEmail) return;

    const db = getFirestore();
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('userEmail', '==', loggedInUserEmail));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userInfo = querySnapshot.docs[0].data();
        this.username = userInfo['username'];
        this.usernumber = userInfo['phone'];
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  async fetchDriverInfo(driverEmail: string) {
    const db = getFirestore();
    const driversRef = collection(db, 'users');
    const q = query(driversRef, where('username', '==', driverEmail));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const driverInfo = querySnapshot.docs[0].data();
        this.drivername = driverInfo['username'];
        this.drivernumber = driverInfo['phone'];
      }
    } catch (error) {
      console.error('Error fetching driver info:', error);
    }
  }

  confirmBooking() {
    this.router.navigate(['/activity'], {
      queryParams: {
      }
    });
  }
}