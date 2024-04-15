import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authentication = false;
  
  constructor() { }

  canActivate() {
    return this.authentication;
  }

  Load() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.authentication) {
          resolve('');
        } else {
          reject()
        }
      }, 2000)
    });
  }
}
