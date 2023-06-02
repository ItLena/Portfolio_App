import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent  implements OnInit{
 
  isExpanded: boolean = false;
  isLogged = new BehaviorSubject<boolean>(false);
  //userRole$ : Observable<string> | undefined;
  isLoggedIn = false;
  isAdmin= false;
  
  constructor( private authService: AuthService){ } 
 
  ngOnInit(): void{
    this.authService.isLoggedIn();
    this.authService.getStatus.subscribe(x=>this.isLoggedIn = x);

    this.authService.isAdmin() ? this.isAdmin = true : false
   }
 


 
}
