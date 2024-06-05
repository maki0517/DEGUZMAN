import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  bookings: any[] = [];

  constructor() { }

  async ngOnInit() {
    this.fetchBookings();
  }

  async fetchBookings() {
    const db = getFirestore();
    const bookingsRef = collection(db, 'books');
    const q = query(bookingsRef);

    try {
      const querySnapshot = await getDocs(q);
      this.bookings = querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }
}


