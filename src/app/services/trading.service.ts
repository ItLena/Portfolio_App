import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable } from 'rxjs/internal/Observable';
import { Trading } from '../models/trading';



@Injectable({
  providedIn: 'root'
})
export class TradingService {

  constructor(
    private http:HttpClient) { }

  apiUrl = 'https://localhost:7059/api/Trading'

  createTransaction(trading: Trading):Observable<Trading>{
    return this.http.post<Trading>(this.apiUrl +'/add', trading)
  }

 
  getAll() : Observable<Trading[]>{
    return this.http.get<Trading[]>(this.apiUrl + '/getAll')
  }

   
}
