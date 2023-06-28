import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit{
 
 
  @Input() isExpanded?: boolean;
  @Input()  isAdmin? : boolean;



  ngOnInit(): void {
  
  }
     
}
