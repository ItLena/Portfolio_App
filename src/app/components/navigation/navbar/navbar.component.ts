import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{

  @Output() readonly mode = new EventEmitter<boolean>();
  isDarkMode = false; 
  isLoggedIn$!: Observable<boolean>; 
  
  constructor( private authService: AuthService, private toastr: ToastrService){ } 

  ngOnInit(): void{
    this.isLoggedIn$ = this.authService.isLoggedIn();
   
   }

  logout(){    
    this.authService.logOut();
    this.toastr.success('Du är utloggad!')     
  }

  onChangeToggle(){
    this.isDarkMode =!this.isDarkMode
    this.mode.emit(this.isDarkMode)   
  }
 
}
