import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ride-info',
  templateUrl: './ride-info.page.html',
  styleUrls: ['./ride-info.page.scss'],
})
export class RideInfoPage implements OnInit {
  selectedDateTime: string = '';
  selectedDriver: string = '';
  pickUpLocation: string = '';
  dropOffLocation: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    const state = history.state;
    this.selectedDateTime = state.selectedDateTime;
    this.selectedDriver = state.selectedDriver;
    this.pickUpLocation = state.pickUpLocation;
    this.dropOffLocation = state.dropOffLocation;
  }

  navigateToCompleteInfo() {
    this.router.navigate(['/complete-info'], {
      state: {
        selectedDateTime: this.selectedDateTime,
        selectedDriver: this.selectedDriver,
        pickUpLocation: this.pickUpLocation,
        dropOffLocation: this.dropOffLocation
      }
    });
  }
}
