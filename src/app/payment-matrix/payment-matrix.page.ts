import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-payment-matrix',
  templateUrl: './payment-matrix.page.html',
  styleUrls: ['./payment-matrix.page.scss'],
})
export class PaymentMatrixPage implements OnInit {
  selectedPaymentMethod: string = '';
  accountName: string = '';
  accountPhoneNumber: string = '';
  currentUserUid: string = '';

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  ngOnInit() {
    this.loadPaymentInformation();
  }

  async loadPaymentInformation() {
    const user = await this.authService.getUser();
    if (user) {
      this.currentUserUid = user.uid;
      this.firestore.collection('paymentMethods').doc(this.currentUserUid).get()
        .subscribe(doc => {
          if (doc.exists) {
            const paymentData: any = doc.data();
            this.selectedPaymentMethod = paymentData.paymentMethod;
            if (this.selectedPaymentMethod === 'GCash') {
              this.accountName = paymentData.accountName;
              this.accountPhoneNumber = paymentData.accountPhoneNumber;
            }
          }
        });
    }
  }

  async savePaymentMethod() {
    try {
      const user = await this.authService.getUser();
      if (user) {
        const uid = user.uid;
        const paymentData = {
          paymentMethod: this.selectedPaymentMethod,
          ...(this.selectedPaymentMethod === 'GCash' && {
            accountName: this.accountName,
            accountPhoneNumber: this.accountPhoneNumber
          }),
          uid: uid
        };

        await this.firestore.collection('paymentMethods').doc(uid).set(paymentData);
        console.log('Payment method saved successfully!');
      } else {
        console.error('No user is logged in.');
      }
    } catch (error) {
      console.error('Error saving payment method: ', error);
    }
  }
}
