import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from '../../../services/person.service';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],  
})
export class RegisterComponent {

  @Input() person?: Person;
  constructor( private builder: FormBuilder, private toastr: ToastrService,
    private service: PersonService, private router: Router){
  }

  registerForm = this.builder.group({
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    userName: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.required),
    personRole: 'customer',
  })

  registerUser(person: Person){
    const person_data = this.registerForm.value;
   this.registerForm.valid ?
    this.service.createUser(person_data).subscribe(()=>{
    this.toastr.success("Registreringen lyckades");
    this.registerForm.reset();
    this.router.navigate(['login'])
   })
    : this.toastr.warning('Fyll alla nödvändiga rutor')
   
  }
}