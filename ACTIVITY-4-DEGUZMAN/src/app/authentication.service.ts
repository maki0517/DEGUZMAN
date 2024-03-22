import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: boolean = false;

  constructor() { }

  canActivate() {
    return this.isAuthenticated
  }
}