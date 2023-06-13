import { DOCUMENT } from '@angular/common';
import { Component, Renderer2, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

 title = 'portfolio-app'; 



 constructor(@Inject (DOCUMENT) private document: Document, 
  private renderer: Renderer2){}


 
  switchMode($event: any){
    let hostClass = $event? 'dark-theme' : 'light-theme';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);   
    window.localStorage.getItem(hostClass) 
  }
  
}
