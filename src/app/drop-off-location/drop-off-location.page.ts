import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-drop-off-location',
  templateUrl: './drop-off-location.page.html',
  styleUrls: ['./drop-off-location.page.scss'],
})
export class DropOffLocationPage implements OnInit {
  selectedDateTime: string = '';
  selectedDriver: string = '';
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
    this.pickUpLocation = state.pickUpLocation;

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
    this.dropOffLocation = address;
  }

  confirm() {
    if (!this.dropOffLocation) {
      this.authService.presentAlert('Error', 'Please select a drop-off location.');
      return;
    }
    
    this.router.navigate(['/ride-info'], {
      state: {
        selectedDateTime: this.selectedDateTime,
        selectedDriver: this.selectedDriver,
        pickUpLocation: this.pickUpLocation,
        dropOffLocation: this.dropOffLocation
      }
    });
  }
  
}
