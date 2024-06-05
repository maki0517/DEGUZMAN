import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { iAddress } from '../admin/admin.model';

@Component({
  selector: 'app-complete-info',
  templateUrl: 'complete-info.page.html',
  styleUrls: ['complete-info.page.scss'],
})
export class CompleteInfoPage {
  selectedDateTime: string = '';
  selectedDriver: string = '';
  selectedDriverEmail: string = '';
  pickUpLocation: any;
  dropOffLocation: any;
  username: string = '';
  usernumber: string = '';
  drivername: string = '';
  drivernumber: string = '';
  loggedInUserEmail: string = '';
  addressList: iAddress[] = [];
  selectedPaymentMethod: string = '';
  isLoading: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime;
    this.selectedDriver = state.selectedDriver;
    this.selectedDriverEmail = state.selectedDriverEmail;
    this.pickUpLocation = state.pickUpLocation;
    this.dropOffLocation = state.dropOffLocation;
    this.selectedPaymentMethod = state.selectedPaymentMethod;

    this.loggedInUserEmail = localStorage.getItem('email') || '';
    this.fetchUserInfo(this.loggedInUserEmail);
    console.log(this.selectedDriverEmail);
    this.fetchDriverInfo(this.selectedDriverEmail); 
    console.log(this.selectedDriverEmail);

  }

  async fetchUserInfo(loggedInUserEmail: string | null) {
    if (!loggedInUserEmail) return;

    const db = getFirestore();
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', loggedInUserEmail));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userInfo = querySnapshot.docs[0].data();
        this.username = userInfo['username'];
        this.usernumber = userInfo['phNo'];
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  async fetchDriverInfo(driverEmail: string) {
    const db = getFirestore();
    const driversRef = collection(db, 'users');
    const q = query(driversRef, where('email', '==', driverEmail));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const driverInfo = querySnapshot.docs[0].data();
        this.drivername = driverInfo['username'];
        this.selectedDriverEmail = driverInfo['email'];
        this.drivernumber = driverInfo['phNo'];
      }
    } catch (error) {
      console.error('Error fetching driver info:', error);
    }
  }

  async fetchAddresses() {
    try {
      this.isLoading = true;
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'address'));
      this.addressList = [];
      querySnapshot.forEach((doc) => {
        const addressData = doc.data();
        const address: iAddress = {
          id: doc.id,
          title: addressData['title'],
          place: addressData['place']
        };
        this.addressList.push(address);
      });
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async confirmBooking() {
    const db = getFirestore();
    const bookingsRef = collection(db, 'books');
    const usersRef = collection(db, 'users');

    console.log(this.selectedDriverEmail);

    try {
      await addDoc(bookingsRef, {
        'email': this.selectedDriverEmail,
        'username': this.drivername,
        'phNo': this.drivernumber,
        'dropOffLocation': this.dropOffLocation ? this.dropOffLocation : null, 
        'pickUpLocation': this.pickUpLocation ? this.pickUpLocation : null,
        'paymentMethod': this.selectedPaymentMethod,
        'time-date': this.selectedDateTime,
      });
      console.log('Booking information saved to Firestore');

      const q = query(usersRef, where('email', '==', this.selectedDriverEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const driverDocRef = querySnapshot.docs[0].ref;
        await updateDoc(driverDocRef, { 'available': false });
        console.log('Driver availability updated successfully');
      } else {
        console.error('Driver document not found for email:', this.selectedDriverEmail);
      }
    } catch (error) {
      console.error('Error saving booking information:', error);
    }

    this.router.navigate(['tabs/activity']);
  }
}
