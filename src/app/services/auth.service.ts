import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/person';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:7059/api/Login';  

  constructor(private http: HttpClient, private router: Router) { }


  
  login(login: Login) : Observable<any>{
    return this.http.post(this.apiUrl + '/login', login)
  }

  logOut(){
    localStorage.clear();   
    this.router.navigate([''])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn() : boolean{
    return !localStorage.getItem('token') 
  }
}
