import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-another-page',
  templateUrl: 'another-page.page.html'
  
})
export class AnotherPage implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}
  goWithAuthentication (){
    this.authenticationService.canProceed = true;
}
  goToMyCustomPageByEvent () {
      this.router.navigate(['shared-page']);
  }
  ngOnInit(): void {
    this.authenticationService.canProceed = false;
}
ionViewWillEnter(){
  console.log("You will now enter another page.");
}
ionViewDidEnter(){
  console.log("You did enter another page.");
}
ionViewWillLeave(){
  console.log("You will now leave another page.");
}
ionViewDidLeave(){
  console.log("You did leave another page.");
}
}
