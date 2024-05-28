import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  books: any[] = [];

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    const clientEmail = localStorage.getItem('email');
    if (!clientEmail) {
      console.error('No client email found in local storage');
      return;
    }

    const db = getFirestore();
    const booksRef = collection(db, 'books');
    const q = query(booksRef, where('client-email', '==', clientEmail));

    try {
      const querySnapshot = await getDocs(q);
      this.books = querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }
}

