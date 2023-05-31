import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Performance } from '../models/portfolio';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://localhost:7059/api/Performance'

  
  getPerformancesByPortfolioId(id: any) :Observable<Performance[]>{
    return this.http.get<Performance[]>(this.apiUrl + '/performances?portfolioId=' + id)
  }


 }