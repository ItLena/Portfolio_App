import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent{

  @Output() readonly mode = new EventEmitter<boolean>();
  isDarkMode = false;

  
  constructor( private authService: AuthService){    
  } 


  logout(){
    this.authService.logOut();
  }

  onChangeToggle(){
    this.isDarkMode =!this.isDarkMode
    this.mode.emit(this.isDarkMode)
    
  }

}
