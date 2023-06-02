import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/person';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    apiUrl = 'https://localhost:7059/api/Login';  
    status = new BehaviorSubject<boolean>(false);
    getStatus = this.status.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router,
    private helper: JwtHelperService,
   ) { }

  //Access to login end point
  login(login: Login) : Observable<any>{
    return this.http.post(this.apiUrl + '/login', login)   
  }

  // log out and clean storage
  logOut(){
    localStorage.clear(); 
    this.status.next(false);  
    this.router.navigate([''])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  // if user has token 
   isLoggedIn() {    
    let logged = false
     this.status.next(!(!localStorage.getItem('token'))) 
     this.getStatus.subscribe(x => logged = x)
     return logged
  }

  //takes token and decode user role 
  hasRole(){
    let token = this.getToken();
    let decode = this.helper.decodeToken(token!);
    let userRole = decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return  userRole ; 
  } 
  
  //if userRole is admin
  isAdmin(): boolean{
   return  this.hasRole() == 'admin' ? true : false
  }

}
