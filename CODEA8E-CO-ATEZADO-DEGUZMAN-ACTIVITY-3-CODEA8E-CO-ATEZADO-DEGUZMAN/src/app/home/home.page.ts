import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private authenticationService: AuthenticationService, private router: Router) {}
    goWithAuthentication(){
      this.authenticationService.canProceed = true;
    }
    goToMyCustomPageByEvent() {
    this.router.navigate(['another-page'])
}
    ngOnInit(): void {

}
  ionViewWillEnter(){
  console.log("You will now enter home page.")
}
  ionViewDidEnter(){
  console.log("You did enter another page.")
}
  ionViewWillLeave(){
  console.log("You will now leave home page.")
}
  ionViewDidLeave(){
  console.log("You did leave another page.")
}
}
