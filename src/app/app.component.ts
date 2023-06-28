import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, Inject, OnInit, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

 title = 'portfolio-app'; 
 isExpanded: boolean = false; 
 isAdmin: boolean = false;
 isLoggedIn$!: Observable<boolean>; 
 savestatus: any;

 constructor(@Inject (DOCUMENT) private document: Document, 
  private renderer: Renderer2, private authService: AuthService,
  ){}


  ngOnInit(): void {

    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.authService.updateMenu.subscribe(res=>{
    this.getAdmin()
    console.log("admin", this.isAdmin)
  })
  }

  getAdmin() {  
    this.authService.getRole() == 'admin'?  this.isAdmin = true
      : this.isAdmin = false; 
  }
  
  switchMode($event: any){
    let hostClass = $event? 'dark-theme' : 'light-theme';
    this.renderer.setAttribute(this.document.body, 'class', hostClass); 
    window.localStorage.getItem(hostClass) 
    console.log("mood:", hostClass)
  }

 
  
}
