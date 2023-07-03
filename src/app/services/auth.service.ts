import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/person';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:7059/api/Login';
  loginStatus = new BehaviorSubject<boolean>(false);  
  adminStatus = new Subject<boolean>();  
 
  constructor(
    private http: HttpClient,
    private router: Router,
    private helper: JwtHelperService,
  ) { }

 

  //Access to login end point
  login(login: Login): Observable<any> {
    return this.http.post(this.apiUrl + '/login', login)
  }

  // log out and clean storage
  logOut() {
    localStorage.clear();
    this.loginStatus.next(false);
    this.router.navigate(['']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn() {
    this.loginStatus.next(!this.helper.isTokenExpired(this.getToken()))
    return this.loginStatus.asObservable();
  }
 
  //takes token, decode user role  and return boolean
  getRole() {
    if (this.getToken() != null) {
      let decode = this.helper.decodeToken(this.getToken()!);
      return decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
  }
  isAdmin(){
   this.adminStatus.next(this.getRole() === 'admin')
   return this.adminStatus.asObservable();
  }

  
}
