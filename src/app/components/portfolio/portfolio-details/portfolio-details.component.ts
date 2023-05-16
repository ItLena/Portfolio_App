import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.scss']
})
export class PortfolioDetailsComponent {
  
  portfolio: any = Portfolio ;
  constructor( private portfolioService: PortfolioService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void{
   
   let id: any = this.activeRoute.snapshot.paramMap.get('id')

    this.portfolioService.getPortfolioById(id)
    .subscribe(result => {
      this.portfolio = result
      console.log(this.portfolio)
    })  
  }
}
