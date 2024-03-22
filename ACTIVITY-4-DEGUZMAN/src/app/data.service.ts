import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  myObjectArray: number[] = [1, 2, 3];

  constructor(private authenticationService: AuthenticationService) {}

  fetchData(): Promise<string> {
    return new Promise(resolve=> {
      setTimeout(()=> {
        resolve("Data fetched successfully");
      }, 2000);
    })
  }

    fetchData1(): Promise<any> {
      return new Promise((resolve, reject) => {
      if (this.authenticationService.canActivate()) {
          setTimeout(() => {
          resolve(this.myObjectArray);
          }, 2000);
        } else {
        reject();
        }
      })
    }

    addArray (array: any): Promise<any> {
      return new Promise((resolve, reject) => {
        if (this.authenticationService.canActivate()) {
          setTimeout(() => {
            const addMyArray = [...this.myObjectArray, array];
            this.myObjectArray = addMyArray;
            resolve(this.myObjectArray);
          }, 2000);
        } else {
          reject();
        }
      });
    }

 
  

  




  
}
