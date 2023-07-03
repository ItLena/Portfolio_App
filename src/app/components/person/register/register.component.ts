import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from '../../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{

  userForm!: FormGroup;
  title!: string;
  id: any;
  person?: Person; 
  submiting = false;
  submited = false;

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

    this.title = 'Skapa ny användare';

    //edit mode
    if (this.id) {
      this.title = 'Redigera användarens data';
         

      this.service.getUserById(this.id)
        .pipe(first())
        .subscribe(res => {
          this.person = res;
          this.userForm.patchValue(res);         
        })
    }
  }

  onSubmit() {
    this.submited = true;
    this.submiting = true;
    this.userForm.valid ?
      this.saveUser()
        .pipe(first())
        .subscribe({
          next: () => {
            this.id  ? this.toastr.success("Uppdateringen lyckades") : this.toastr.success("Registreringen lyckades");
            this.userForm.reset();            
            this.authService.getRole() == 'admin' ? this.router.navigate(['users']) : this.router.navigate([''])
          }
        })
      : this.toastr.warning('Fyll alla nödvändiga rutor');
    this.submiting = false;
  };

  private saveUser() {    
    return this.id ? this.service.updateUser(this.id, this.userForm.value) : this.service.createUser(this.userForm.value)
  }
  back(){
    this.authService.getRole() == 'admin' || this.id? this.router.navigate(['users']) :  this.router.navigate([''])
  }
}

