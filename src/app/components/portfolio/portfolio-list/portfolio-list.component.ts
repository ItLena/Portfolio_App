import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent {

  
  portfolio: Portfolio[] = [];
  displayedColumns: string[] = ['Portföljnamn', 'Skapad', 'Benchmark', 'Potföljägare', 'Visa mer'];
  constructor( private portfolioService: PortfolioService, private router: Router) {}

  ngOnInit(): void{
    this.portfolioService.getAll()
    .subscribe((result: Portfolio[])=> (this.portfolio = result))  
  }

  showDetails(id: any){
    this.router.navigate(['/portfolios' +'/'+ id])  
  }
}
