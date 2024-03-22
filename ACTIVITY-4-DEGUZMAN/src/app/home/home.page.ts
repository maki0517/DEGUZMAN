import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  objectArray: number[] = [];
  isHidden: boolean = true;
  isLoading = true;
  loadingText = "Loading...";

  constructor(private dataService: DataService, private authenticationService: AuthenticationService, private router: Router) {}

  async showObject() {
      try {
        this.isLoading = true;
        if (this.isLoading == true) {
          this.isHidden = false;
          this.objectArray = await this.dataService.fetchData1();
          console.log(this.objectArray)
          }
          this.isHidden = true;
      } catch (error) {
        const customError = new Error('Rejection Reason: ${error.message}');
        console.error(customError);
      } finally {
        this.isLoading = false;
      }
    }

    async addObject() {
      try {
        const addNumber = this.objectArray.length + 1;
        await this.dataService.addArray(addNumber);
        this.isHidden = false;
      } catch (error) {
        const customError = new Error('Rejection Reason: ${error.message}');
        console.error(customError);
      }
    }

    goWithAuthentication (){
      this.authenticationService.isAuthenticated = true;
      this.isHidden = false;
      console.log("Authenticated");
    }

    goWithUnAuthentication(){
      if (!this.authenticationService.isAuthenticated) {
        const customError = new Error('Rejection Reason: ${error.message}');
        console.error(customError);
      } else {
        this.authenticationService.isAuthenticated = false;
        this.isHidden = false;
        console.log("Unauthenticated");
      } 
   }
}
