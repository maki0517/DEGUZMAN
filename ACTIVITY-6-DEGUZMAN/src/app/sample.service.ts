import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Quotations } from './model/model';


@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(private http: HttpClient) { }

  getShowData(): Observable<Quotations[]>{
    return this.http.get<any>('https://api.quotable.io/quotes/random?limit=100');
  }
}
