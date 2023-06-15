import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from '../../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  userForm!: FormGroup;
  title!: string;
  id: any;
  person?: Person;
  loading: boolean = false;
  submitting = false;
  submitted = false;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: PersonService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    //form with validations
    this.userForm = this.builder.group({
      id: this.builder.control('1'),
      firstName: this.builder.control('', Validators.required),
      lastName: this.builder.control('', Validators.required),
      userName: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
      password: this.builder.control('', Validators.required),
      personRole: this.builder.control('customer')
    })

    this.title = 'Add user';

    //edit mode
    if (this.id) {
      this.title = 'Edit user';
      this.loading = true;

      this.service.getUserById(this.id)
        .pipe(first())
        .subscribe(res => {
          this.person = res;
          this.userForm.patchValue(res);
          this.loading = false;
        })
    }
  }

  onSubmit() {
    this.submitted = true;
    this.submitting = true;
    this.userForm.valid ?
      this.saveUser()
        .pipe(first())
        .subscribe({
          next: () => {
            this.id ? this.toastr.success("Uppdateringen lyckades") : this.toastr.success("Registreringen lyckades");
            this.userForm.reset();
            this.router.navigate([''])
          }
        })
      : this.toastr.warning('Fyll alla nödvändiga rutor');
    this.submitting = false;
  };

  private saveUser() {    
    return this.id ? this.service.updateUser(this.id!, this.userForm.value) : this.service.createUser(this.userForm.value)
  }
  back(){
    this.authService.isAdmin() || this.id? this.router.navigate(['users']) :  this.router.navigate([''])
  }
}

