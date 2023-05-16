import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], 
})
export class HomeComponent {

  isExpanded: boolean | undefined;
  constructor (private service: AuthService, private jwtHelper: JwtHelperService){}

  toggle(){
    this.isExpanded = !this.isExpanded
  }
   
  //   decodedToken(){
  //      const token = this.service.getToken()
  //     if(token){
  //       this.jwtHelper.decodeToken(this.token)
  //     }

 
  //   return  console.log("Token: ",)
  //  } 
  
  
  
 

  

}
