import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portfolio, Position } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.scss']
})
export class PortfolioDetailsComponent {
  
  portfolio: any = Portfolio ;
  position: any = Position;
  displayedColumns: string[] = ['Värdepaperstyp', 'Företagsnamn', 'Innehav', 'Värde', 'Datum', 'Agera'];
  
  constructor( 
    private portfolioService: PortfolioService,
     private activeRoute: ActivatedRoute, 
     private positionService: PositionService) {}

  ngOnInit(): void{
   
   let id: any = this.activeRoute.snapshot.paramMap.get('id')

    this.portfolioService.getPortfolioById(id)
    .subscribe(result => {
      this.portfolio = result
      console.log(this.portfolio)
    })  

    this.positionService.getPositionsByPortfolioId(id)
    .subscribe(result=> {
      this.position = result
      console.log(this.position)
    }
    )

  }
}
