import { Component } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userData: any;
  constructor( private builder: FormBuilder, private toastr: ToastrService,
    private service: PersonService, private router: Router){
  }

  loginForm = this.builder.group({
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.required),
  })

//   proceedLogin(){
//    this.loginForm.valid ? this.service.getUserById(this.loginForm.value.email).subscribe(res=>{  
//     this.userData = res; 

//    // this.router.navigate(['home'])
//    })
//     : this.toastr.warning('Fyll alla nödvändiga rutor')
   
//   }
}
