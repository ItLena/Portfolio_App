import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from '../../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  registerForm!: FormGroup;
  isAddMood!: boolean;
  loading = false;
  submitted = false;
  id: any;

  @Input() person?: Person;
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: PersonService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMood = !this.id;

    if (this.isAddMood) {
      this.registerForm = this.builder.group({
        firstName: this.builder.control('', Validators.required),
        lastName: this.builder.control('', Validators.required),
        userName: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
        password: this.builder.control('', Validators.required),
        personRole: 'customer'
      })
    }
    if(!this.isAddMood){
      this.service.getUserById(this.id)
      .pipe(first())
      .subscribe(x=>this.registerForm.patchValue(x));
    }
  }

  onSubmit(){
    this.submitted = true;
    this.loading = true;
    if(this.isAddMood){
      this.registerUser()
    }else{
      this.updateUser()
    }

  }

  registerUser() {
    const person_data = this.registerForm.value;
    this.registerForm.valid ?
      this.service.createUser(person_data).subscribe(() => {
        this.toastr.success("Registreringen lyckades");
        this.registerForm.reset();
        this.router.navigate(['login'])
      })
      : this.toastr.warning('Fyll alla nödvändiga rutor')
  }

  updateUser() {
    this.service.updateUser(this.id, this.registerForm.value)
    .pipe(first())
    .subscribe({
      next:() =>{
        this.toastr.success("Uppdateringen lyckades");
        this.router.navigate(['home'])
      },
      error: error =>{
        this.toastr.warning('Någonting gick fel')
        this.loading = false;
      }
    })

  }
}

