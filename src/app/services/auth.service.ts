import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/person';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:7059/api/Login';
  status = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private helper: JwtHelperService,
  ) { }

  private _updateMenu = new Subject<void>();
  get updateMenu() {
    return this._updateMenu;
  }

  //Access to login end point
  login(login: Login): Observable<any> {
    return this.http.post(this.apiUrl + '/login', login)

  }

  // log out and clean storage
  logOut() {
    localStorage.clear();
    this.status.next(false);
    this.router.navigate(['']);

  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  // if user has token 
  isLoggedIn() {
    this.status.next(!(!localStorage.getItem('token')))
    return this.status.asObservable();
  }

  //takes token, decode user role  and return boolean
  getRole() {
    if (this.getToken() != null) {
      let decode = this.helper.decodeToken(this.getToken()!);
      let role = decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role
    }
  }

}
