import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://localhost:7059/api/Person'

  createUser(person: Person):Observable<Person[]>{
    return this.http.post<Person[]>(this.apiUrl +'/register', person )
  }

  getUserById(person: Person) :Observable<Person[]>{
    return this.http.get<Person[]>(this.apiUrl + '/'+ person.id)
  }

  
  getAll() : Observable<Person[]>{
    return this.http.get<Person[]>(this.apiUrl + '/getAll')
  }

  updateUser(id: any, person: Person) : Observable<Person[]>{
    return this.http.put<Person[]>(this.apiUrl + '/' + id, person)
  }

  deleteUser(person: Person) : Observable<Person[]>{
    return this.http.delete<Person[]>(this.apiUrl + '/' + person.id)
  }
}
