import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Portfolio, Position, Risk } from '../models/portfolio';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://localhost:7059/api/Portfolio'

  
  getPortfolioById(id: any) :Observable<Portfolio>{
    return this.http.get<Portfolio>(this.apiUrl + '/'+ id)
  }

  
  getAll() : Observable<Portfolio[]>{
    return this.http.get<Portfolio[]>(this.apiUrl + '/portfolios')
  }


  getPerformancesByPortfolioId(id: any) :Observable<Performance[]>{
    return this.http.get<Performance[]>(this.apiUrl + '/performances?portfolioId=' + id)
  }

  getRisksByPortfolioId(id: any) :Observable<Risk>{
    return this.http.get<Risk>(this.apiUrl + '/risks?id=' + id)
  }

  getPositionsByPortfolioId(id: any) :Observable<Position[]>{
    return this.http.get<Position[]>(this.apiUrl + '/positions?portfolioId=' + id)
  }
 }