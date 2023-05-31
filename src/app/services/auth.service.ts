import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/person';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    apiUrl = 'https://localhost:7059/api/Login';  


  constructor(
    private http: HttpClient, 
    private router: Router,
    private helper: JwtHelperService,
   ) { }

  
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

   isLoggedIn(): boolean {
    return !localStorage.getItem('token') 
  }

  hasRole(){
    let token = this.getToken();
    let decode = this.helper.decodeToken(token!);
    let userRole = decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return  userRole ; 
  }  

}
