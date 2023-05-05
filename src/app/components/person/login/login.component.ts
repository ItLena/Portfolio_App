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

  userData: any;
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router) {
  }

  loginForm = this.builder.group({
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  })

  login() {
    const data = this.loginForm.value;
    data.userName && data.password ? this.service.login(data).subscribe((token: string) => {   
      this.service.storeToken(token)
        this.toastr.success('Inloggning har lyckats!');
        this.router.navigate(['home'])     
    })
      : this.toastr.warning('Fyll alla nödvändiga rutor')
  }
  
}
