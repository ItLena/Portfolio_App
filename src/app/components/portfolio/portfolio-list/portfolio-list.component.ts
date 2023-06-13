import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent {

  
  portfolio: any;
  displayedColumns: string[] = ['Portföljnamn', 'Skapad', 'Benchmark', 'Potföljägare', 'Visa mer'];
  constructor( private portfolioService: PortfolioService, private router: Router) {}

  ngOnInit(): void{
    this.portfolioService.getAll()
    .subscribe((result: any)=> (
      this.portfolio = new MatTableDataSource(result))
      )  
  }

  showDetails(id: any){
    this.router.navigate(['/portfolios' +'/'+ id])  
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.portfolio.filter = filterValue.trim().toLowerCase();
  }
}
