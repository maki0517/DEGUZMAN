import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-complete-info',
  templateUrl: 'complete-info.page.html',
  styleUrls: ['complete-info.page.scss'],
})
export class CompleteInfoPage {
  selectedDateTime: string = '';
  selectedDriver: string = '';
  selectedDriverEmail: string = '';
  pickUpLocation: string = '';
  dropOffLocation: string = '';
  username: string = '';
  usernumber: string = '';
  drivername: string = '';
  drivernumber: string = '';
  loggedInUserEmail: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime;
    this.selectedDriver = state.selectedDriver;
    this.selectedDriverEmail = state.selectedDriverEmail;
    this.pickUpLocation = state.pickUpLocation;
    this.dropOffLocation = state.dropOffLocation;

    this.loggedInUserEmail = localStorage.getItem('email') || '';
    this.fetchUserInfo(this.loggedInUserEmail);

    this.fetchDriverInfo(this.selectedDriverEmail);
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
    const q = query(driversRef, where('userEmail', '==', driverEmail));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const driverInfo = querySnapshot.docs[0].data();
        this.drivername = driverInfo['username'];
        this.selectedDriverEmail = driverInfo['userEmail'];
        this.drivernumber = driverInfo['phone'];
      }
    } catch (error) {
      console.error('Error fetching driver info:', error);
    }
  }

  async confirmBooking() {
    const db = getFirestore();
    const bookingsRef = collection(db, 'books');

    try {
      await addDoc(bookingsRef, {
        'client-email': this.loggedInUserEmail,
        'client-name': this.username,
        'client-phone': this.usernumber,
        'driver-email': this.selectedDriverEmail,
        'driver-name': this.drivername,
        'driver-phone': this.drivernumber,
        'drop-off-location': this.dropOffLocation,
        'pick-up-location': this.pickUpLocation,
        'time-date': this.selectedDateTime,
      });
      console.log('Booking information saved to Firestore');
    } catch (error) {
      console.error('Error saving booking information:', error);
    }

    this.router.navigate(['/activity'], {
      queryParams: {}
    });
  }
}
