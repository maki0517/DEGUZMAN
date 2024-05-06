import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import your AuthService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userEmail: string = '';
  userName: string = '';
  briefDescription: string = '';
  hobbies: string[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userEmail = localStorage.getItem('email') as string;

    if (this.userEmail === 'maki@gmail.com') {
      this.userName = 'Maki DeGuzman';
      this.briefDescription = 'A second year BSIT Student';
      this.hobbies = ['Singing', 'Dancing', 'Story Creation'];
    } else {
      this.userName = 'Guest';
      this.briefDescription = 'Short Description...';
      this.hobbies = ['N/A'];
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
