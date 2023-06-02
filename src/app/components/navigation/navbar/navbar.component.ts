import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{

  @Output() readonly mode = new EventEmitter<boolean>();
  isDarkMode = false;
  isLoggedIn = false;
  
  constructor( private authService: AuthService){ } 

  ngOnInit(): void{
    this.authService.isLoggedIn();
    this.authService.getStatus.subscribe(x=>this.isLoggedIn = x)
   }

  logout(){    
    this.authService.logOut();
    this.isLoggedIn = false;    
  }

  onChangeToggle(){
    console.log("Toggle-isLoggedIN",this.isLoggedIn)
    this.isDarkMode =!this.isDarkMode
    this.mode.emit(this.isDarkMode)

    
  }

}
