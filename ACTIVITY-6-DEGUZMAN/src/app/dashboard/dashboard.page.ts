import { Component} from '@angular/core';
import { Quotations } from '../model/model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication-service.service';
import { SampleService } from '../sample.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  quote: Quotations[] = [];
  constructor(private routes:  Router, private authenticationService: AuthenticationService, private sampleService: SampleService) { }


  ngOnInit() {
    this.fetchQuotationsInfo();
  }

  async fetchQuotationsInfo() {

    await this.sampleService.getShowData().subscribe(data =>{
      this.quote = data;
      console.log(this.quote)
  });
    }
    async logOut(){
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      this.routes.navigate(['/login']);
    }
  }

