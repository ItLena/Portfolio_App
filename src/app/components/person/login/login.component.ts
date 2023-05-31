import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], 
})
export class LoginComponent {
 
  
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private authService: AuthService, 
    private router: Router) {
  }

  loginForm = this.builder.group({
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  })

  login() {
    const data = this.loginForm.value;
    data.userName && data.password ? this.authService.login(data).subscribe((token: any) => {   
      this.authService.storeToken(token)
       this.toastr.success('Inloggning har lyckats!');             
       let userRole = this.authService.hasRole()
       userRole  === 'admin' ? this.router.navigate(['portfolios'])
        : this.router.navigate(['home'])  
    })
      : this.toastr.warning('Fyll alla nödvändiga rutor')
  }

}
