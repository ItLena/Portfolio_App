import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Portfolio } from '../models/portfolio';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://localhost:7059/api/Position'

  
  getPortfolioById(id: any) :Observable<Portfolio>{
    return this.http.get<Portfolio>(this.apiUrl + '/'+ id)
  }

  
  getAll() : Observable<Portfolio[]>{
    return this.http.get<Portfolio[]>(this.apiUrl + '/portfolios')
  }

//   updateUser(person: Person) : Observable<Person[]>{
//     return this.http.put<Person[]>(this.apiUrl + '/' + person.id, person)
//   }

//   deleteUser(person: Person) : Observable<Person[]>{
//     return this.http.delete<Person[]>(this.apiUrl + '/' + person.id)
//   }

//   createUser(person: Person):Observable<Person[]>{
//     return this.http.post<Person[]>(this.apiUrl +'/register', person )
//   }
 }