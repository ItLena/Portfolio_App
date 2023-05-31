import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Portfolio } from '../models/portfolio';
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


 }