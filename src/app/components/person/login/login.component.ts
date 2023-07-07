import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {


  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  loginForm = this.builder.group({
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    
  })

  ngAfterContentInit(): void {
    this.authService.isLoggedIn()
    .subscribe(res=> 
     console.log("isLogin ngAfterContentInit", res ))   
  }
 
  login() {
    const data = this.loginForm.value;
    
    if (data.userName && data.password) {
      this.authService.login(data).subscribe((token: any) => {
        this.authService.storeToken(token);
        this.authService.isLoggedIn(); 
        this.authService.isAdmin();    

        if (this.authService.isAdmin()) {
          this.router.navigate(['portfolios']);
          this.toastr.success('Hej admin!')
        }
        else {
          this.router.navigate(['home'])
          this.toastr.success('Välkommen till din portfolje app!')
        }
      })

    }
    else {
      this.toastr.warning('Fyll alla nödvändiga rutor')
    }

  }

}
