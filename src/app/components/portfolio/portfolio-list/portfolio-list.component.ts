import { Component } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent {

  
  portfolio: Portfolio[] = [];
  displayedColumns: string[] = ['PortfolioNamn', ]
  constructor( private portfolioService: PortfolioService) {}

  ngOnInit(): void{
    this.portfolioService.getAll()
    .subscribe((result: Portfolio[])=> (this.portfolio = result))  
  }
}
