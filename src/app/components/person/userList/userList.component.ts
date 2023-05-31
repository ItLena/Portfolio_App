import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.scss'],
})
export class UserListComponent {

  persons: Person[] = [];
  displayedColumns: string[] = ['Id', 'Namn', 'Efternamn', 'Epost', 'Roll', 'Redigera'];
  
  constructor( private personService: PersonService,  private router: Router) {}

  ngOnInit(): void{
    this.personService.getAll()
    .subscribe((result: Person[])=> (this.persons = result))  
  }

  editUser(id:any){
    this.router.navigate(['/editUser/'+ id])     
  }
  addUser(){
    this.router.navigate(['/register'])  
  }
}
