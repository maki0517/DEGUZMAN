import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iAddress } from '../admin/admin.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ride-info',
  templateUrl: './ride-info.page.html',
  styleUrls: ['./ride-info.page.scss'],
})
export class RideInfoPage implements OnInit {
  selectedDateTime: string = '';
  selectedDriver: string = '';
  selectedDriverEmail: string = '';
  pickUpLocation: any;
  dropOffLocation: any;
  addressList: iAddress[] = [];
  carType: string[] = [];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime;
    this.selectedDriver = state.selectedDriver;
    this.selectedDriverEmail = state.selectedDriverEmail;
    this.pickUpLocation = state.pickUpLocation;
    this.dropOffLocation = state.dropOffLocation;
    this.authService.currentCarType.subscribe(type => this.carType = type);
    
  }

  navigateToCompleteInfo() {
    this.router.navigate(['complete-info'], {
      state: {
        selectedDateTime: this.selectedDateTime,
        selectedDriver: this.selectedDriver,
        selectedDriverEmail: this.selectedDriverEmail,
        addressList: this.addressList,
        dropOffLocation: this.addressList
      }
    });
  }
}
