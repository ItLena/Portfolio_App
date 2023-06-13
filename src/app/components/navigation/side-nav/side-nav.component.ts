import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent  implements OnInit{
 
  isExpanded: boolean = false; 
  isAdmin : (boolean | null) = false;
  isLoggedIn$!: Observable<boolean>; 
    
  
  constructor( private authService: AuthService){ } 
 
  ngOnInit(): void{
    this.isLoggedIn$ = this.authService.isLoggedIn();
    // this.authService.isAdmin() ? this.isAdmin = true : false
    this.isAdmin = this.authService.isAdmin();
    if(this.authService.isAdmin()){
      this.isAdmin = true
    }
    else{
      this.isAdmin = false
    }
    console.log("isLogged", this.isLoggedIn$)
    console.log("isAdmin", this.isAdmin)
    
   }
 

 
}
