import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  navigateToCarType() {
    this.router.navigate(['/car-type']);
  }

  navigateToPreBook() {
    this.router.navigate(['/pre-book']);
  }

  navigateToChat() {
    this.router.navigate(['/chat']);
  }

  navigateToActivity() {
    this.router.navigate(['/activity']);
  }

  navigateToUserAccount() {
    this.router.navigate(['/user-account']);
  }

  navigateToDriverInfo() {
    this.router.navigate(['/driver-info']);
  }

  navigateToPaymentMatrix() {
    this.router.navigate(['/payment-matrix']);
  }

  navigateToAdmin() {
    this.router.navigate(['admin']);
  }

  logout() {
    this.authService.logout();
  }
}
