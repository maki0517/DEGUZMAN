import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {
  driverData: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.authService.getDriverData(user.uid)
        .then(data => {
          this.driverData = data;
        })
        .catch(error => {
          console.error("Error fetching driver data: ", error);
        });
    } else {
      console.error("No user is logged in");
    }
  }

  logOut () {
    this.authService.logout();
  }

}
