import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { iAddress, Address } from '../admin/admin.model';
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
  pickUpLocation: string = '';
  dropOffLocation: string = '';
  recentBooks: string[] = [];
  savedAddresses: string[] = [];
  loggedInUserEmail: string = '';

  query: string = '';
  places: any[] = [];
  addressList: iAddress[] = [];

  constructor(private router: Router,private authService: AuthService,) { }

  ngOnInit() {
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime;
    this.selectedDriver = state.selectedDriver;

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
        pickUpLocation: this.pickUpLocation,
        dropOffLocation: this.dropOffLocation
      }
    });
  }

  async searchAddress() {
    if (this.query === '') {
      this.places = [];
      return;
    }
    /*try {
      const autoCompleteItems = addresses.filter(address =>
        address.address.toLowerCase().includes(this.query.toLowerCase()) ||
        address.title.toLowerCase().includes(this.query.toLowerCase())
      ).map(address => ({
        title: address.title,
        address: address.address
      }));
  
      this.places = autoCompleteItems;
      console.log(this.places);
    } catch (error) {
      console.error(error);
    }
  */
  }

  choosePlace(place: any) {
    this.addressList = place;
    this.query = place.address;
    this.places = [];
    console.log(this.query);
}
}
