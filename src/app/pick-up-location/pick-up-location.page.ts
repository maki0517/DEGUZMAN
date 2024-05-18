import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

@Component({
  selector: 'app-pick-up-location',
  templateUrl: './pick-up-location.page.html',
  styleUrls: ['./pick-up-location.page.scss'],
})
export class PickUpLocationPage implements OnInit {
  selectedDateTime: string = '';
  selectedDriver: string = '';
  selectedDriverEmail: string = '';
  pickUpLocation: string = '';
  dropOffLocation: string = '';
  recentBooks: string[] = [];
  savedAddresses: string[] = [];
  loggedInUserEmail: string = '';

  constructor(private router: Router,private authService: AuthService,) { }

  ngOnInit() {
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime;
    this.selectedDriver = state.selectedDriver;
    this.selectedDriverEmail = state.selectedDriverEmail;
    this.loggedInUserEmail = localStorage.getItem('email') || '';

    this.fetchRecentBooks();
    this.fetchSavedAddresses();
  }

  async fetchRecentBooks() {
    const db = getFirestore();
    const booksRef = collection(db, 'completed-books');
    const q = query(booksRef, where('user-email', '==', this.loggedInUserEmail));

    try {
      const querySnapshot = await getDocs(q);
      this.recentBooks = querySnapshot.docs.map(doc => doc.data()['address']);
    } catch (error) {
      console.error('Error fetching recent books:', error);
    }
  }

  async fetchSavedAddresses() {
    const db = getFirestore();
    const addressesRef = collection(db, 'saved-addresses');
    const q = query(addressesRef, where('user-email', '==', this.loggedInUserEmail));

    try {
      const querySnapshot = await getDocs(q);
      this.savedAddresses = querySnapshot.docs.map(doc => doc.data()['address']);
    } catch (error) {
      console.error('Error fetching saved addresses:', error);
    }
  }

  selectAddress(address: string) {
    this.pickUpLocation = address;
  }

  confirm() {
    if (!this.pickUpLocation) {
      this.authService.presentAlert('Error', 'Please select a pick-up location.');
      return;
    }

    this.router.navigate(['/drop-off-location'], {
      state: {
        selectedDateTime: this.selectedDateTime,
        selectedDriver: this.selectedDriver,
        selectedDriverEmail: this.selectedDriverEmail,
        pickUpLocation: this.pickUpLocation,
        dropOffLocation: this.dropOffLocation
      }
    });
  }

}
