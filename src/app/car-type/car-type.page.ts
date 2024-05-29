import { Component, OnInit } from '@angular/core';
import { Car } from './car-type.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-car-type',
  templateUrl: './car-type.page.html',
  styleUrls: ['./car-type.page.scss'],
})
export class CarTypePage implements OnInit {
  car: Car = new Car();
  carType: string[] = ['2-seaters', '4-seaters', '6-seaters'];
  constructor(private router: Router, private alertController: AlertController, private authService: AuthService, private loadController: LoadingController) { }

  ngOnInit() {
    console.log(this.car.type);
  }

  async confirm() {
    if (!this.car.type) {
      // Present an alert if car.type is empty or null
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please select a car type',
        buttons: ['OK']
      });
      await alert.present();
      return;
    } else {
      this.router.navigate(['pick-up-loc']);
    }

    // Log the selected car type for debugging purposes
    console.log(this.car.type);
  }

  // kaklase ko po gumawa nito, bale ang function po nito is kapag hindi po nakapili si user ng car type tapos nag-confirm siya, hindi niya po ma-access next page
}