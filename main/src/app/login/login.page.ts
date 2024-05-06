import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {} // Inject Router here

  ngOnInit() {}

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        console.log("Logged in!")
        this.router.navigate(['/dashboard']); // Use the injected Router service
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
    this.email = '';
    this.password = '';
  }
}
