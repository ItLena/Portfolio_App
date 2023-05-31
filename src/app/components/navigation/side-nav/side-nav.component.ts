import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
 
  isExpanded: boolean = false;
  isLogged = new BehaviorSubject<boolean>(false);
  userRole$ : Observable<string> | undefined;
 

 

 
}
