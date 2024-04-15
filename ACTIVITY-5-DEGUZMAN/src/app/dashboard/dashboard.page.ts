import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.router.navigate(['login']);
    localStorage.removeItem('userName'); 
  }

  async loadData() {
    
  }

}
