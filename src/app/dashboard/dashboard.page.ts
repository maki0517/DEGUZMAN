import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  doc,
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  coffees: any[] = [];
  coffeeName: string = '';
  coffeeAddOns: string = '';
  coffeePrice: number = 0;
  editingCoffee: any = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.fetchCoffees();
  }

  async fetchCoffees() {
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);

    try {
      const querySnapshot = await getDocs(collection(db, 'coffees'));
      const fetchedCoffees = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data()['name'],
        addons: doc.data()['addons'],
        price: doc.data()['price'],
      }));
      this.coffees = fetchedCoffees;
    } catch (error) {
      console.error('Error fetching coffees:', error);
    }
  }

  async saveCoffee() {
    const db = getFirestore();
    if (this.editingCoffee) {
      await updateDoc(doc(db, 'coffees', this.editingCoffee.id), {
        name: this.coffeeName,
        addons: this.coffeeAddOns,
        price: this.coffeePrice,
      });
      this.editingCoffee = null;
    } else {
      await addDoc(collection(db, 'coffees'), {
        name: this.coffeeName,
        addons: this.coffeeAddOns,
        price: this.coffeePrice,
      });
    }
    this.resetForm();
    this.fetchCoffees();
  }

  editCoffee(coffee: any) {
    this.editingCoffee = coffee;
    this.coffeeName = coffee.name;
    this.coffeeAddOns = coffee.addons;
    this.coffeePrice = coffee.price;
  }

  async deleteCoffee(coffee: any) {
    const db = getFirestore();
    await deleteDoc(doc(db, 'coffees', coffee.id));
    this.fetchCoffees();
  }

  resetForm() {
    this.coffeeName = '';
    this.coffeeAddOns = '';
    this.coffeePrice = 0;
  }

  logout() {
    this.authService.logout();
  }
}
