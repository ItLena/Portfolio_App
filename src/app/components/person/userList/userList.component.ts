import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.scss'],
})
export class UserListComponent {

  persons: any;
  displayedColumns: string[] = ['Id', 'Namn', 'Efternamn', 'Epost', 'Roll', 'Redigera'];
  
  constructor( private personService: PersonService,  private router: Router) {}

  ngOnInit(): void{
    this.personService.getAll()
    .subscribe((result: any)=> (
       this.persons = new MatTableDataSource(result)
      ))  
    
  }

  editUser(id:any){
    this.router.navigate(['/editUser/'+ id])     
  }
  addUser(){
    this.router.navigate(['/register'])  
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.persons.filter = filterValue.trim().toLowerCase();
  }
}
