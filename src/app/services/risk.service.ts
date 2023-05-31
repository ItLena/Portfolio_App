import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Risk } from '../models/portfolio';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RiskService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://localhost:7059/api/Risk'
  
  getRisksByPortfolioId(id: any) :Observable<Risk>{
    return this.http.get<Risk>(this.apiUrl + '/risks?id=' + id)
  }

 }