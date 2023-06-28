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
    private router: Router) { }

  loginForm = this.builder.group({
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  })

  login() {
    const data = this.loginForm.value;
    if (data.userName && data.password) {
      this.authService.login(data).subscribe((token: any) => {
        this.authService.storeToken(token);
        this.authService.isLoggedIn();
        this.authService.updateMenu.next();

        if (this.authService.getRole() == 'admin') {
          this.router.navigate(['portfolios']);
          this.toastr.success('Hej admin!')
        }
        else {
          this.router.navigate(['home'])
          this.toastr.success('Inloggningen har lyckats!')
        }
      })

    }
    else {
      this.toastr.warning('Fyll alla nödvändiga rutor')
    }

  }

}
