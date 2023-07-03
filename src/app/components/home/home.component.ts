import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], 
})
export class HomeComponent {

  isExpanded: boolean | undefined;

  toggle(){
    this.isExpanded = !this.isExpanded
  }
     

}
