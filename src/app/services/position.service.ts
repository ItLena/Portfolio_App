import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Portfolio, Position } from '../models/portfolio';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://localhost:7059/api/Position'

  
  getPositionsByPortfolioId(id: any) :Observable<Position[]>{
    return this.http.get<Position[]>(this.apiUrl + '/positions?portfolioId=' + id)
  }


 }