import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.scss'],
})
export class UserListComponent {

  persons!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'userName', 'personRole', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor( private personService: PersonService,  private router: Router) {}

  ngOnInit(): void{
    this.personService.getAll()
    .subscribe((result: any)=> {
       this.persons = new MatTableDataSource(result);
       this.persons.paginator = this.paginator;
        this.persons.sort = this.sort;
    })      
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

    if (this.persons.paginator) {
      this.persons.paginator.firstPage();
    }    
  }
}
