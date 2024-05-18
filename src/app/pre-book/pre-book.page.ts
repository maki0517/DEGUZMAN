import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

@Component({
  selector: 'app-pre-book',
  templateUrl: './pre-book.page.html',
  styleUrls: ['./pre-book.page.scss'],
})
export class PreBookPage implements OnInit {
  selectedDateTime: string = new Date().toISOString();
  selectedDriver: string = '';
  availableDrivers: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchAvailableDrivers();
  }

  async fetchAvailableDrivers() {
    const db = getFirestore();
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('userType', '==', 'driver'), where('isAvailable', '==', true));

    try {
      const querySnapshot = await getDocs(q);
      this.availableDrivers = querySnapshot.docs.map(doc => doc.data()['username']);
    } catch (error) {
      console.error('Error fetching available drivers:', error);
    }
  }

  confirm() {
    if (!this.isFormValid()) {
      this.authService.presentAlert('Error', 'Please fill out all the fields.');
      return;
    }

    const currentDateTime = new Date();
    const selectedDateTimeObj = new Date(this.selectedDateTime);

    if (selectedDateTimeObj > currentDateTime) {
      this.navigateToPickUpLocation();
    } else {
      if (selectedDateTimeObj.getHours() > currentDateTime.getHours() || 
          (selectedDateTimeObj.getHours() === currentDateTime.getHours() && 
           selectedDateTimeObj.getMinutes() > currentDateTime.getMinutes())) {
        this.navigateToPickUpLocation();
      } else {
        this.authService.presentAlert('Error', 'Please select a date and time after the current date and time.');
        return;
      }
    }
  }

  private navigateToPickUpLocation() {
    this.router.navigate(['/pick-up-location'], {
      state: {
        selectedDateTime: this.selectedDateTime,
        selectedDriver: this.selectedDriver
      }
    });
  }

  private isFormValid(): boolean {
    const formData = {
      time: this.selectedDateTime,
      driver: this.selectedDriver,
      pickupLocation: 'Some Location'
    };
  
    if (!formData.time || !formData.driver || !formData.pickupLocation) {
      return false;
    }
  
    return true;
  }
}
