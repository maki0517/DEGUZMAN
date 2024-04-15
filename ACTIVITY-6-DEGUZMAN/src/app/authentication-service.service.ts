import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  canProceed = false;
  constructor() { }
  
  canActivate(){
    return this.canProceed;
  }
}