import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit{
 
 
  @Input() isExpanded?: boolean;
  @Input()  isAdmin$? : boolean;
  @Input() isLogedIn$?: boolean;

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.authService.isAdmin().subscribe(res => (
      this.isAdmin$ = res))  
  }
     
}
