import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from './services/auth.service';



@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'portfolio-app';
  isExpanded: boolean = false;
  isAdmin$!: boolean ;
  isLoggedIn$!: boolean;
  savestatus: any;

  constructor(@Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.authService.isAdmin().subscribe(res => (
      this.isAdmin$ = res))
    this.authService.isLoggedIn().subscribe(res => (
      this.isLoggedIn$ = res))  
    console.log("App-  isLogged:", this.isLoggedIn$, "isAdmin", this.isAdmin$)  
  }

 
  switchMode($event: any) {
    let hostClass = $event ? 'dark-theme' : 'light-theme';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
    window.localStorage.getItem(hostClass)
    console.log("mood:", hostClass)
  }



}
