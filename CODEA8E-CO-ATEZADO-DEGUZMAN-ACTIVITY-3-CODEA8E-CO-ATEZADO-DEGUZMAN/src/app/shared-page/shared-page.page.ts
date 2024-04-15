import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-page',
  templateUrl: 'shared-page.page.html'
})
export class SharedPage {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}
  goWithAuthentication (){
    this.authenticationService.canProceed = true;
}
}
