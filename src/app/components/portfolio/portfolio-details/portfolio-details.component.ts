import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portfolio, Position } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { PositionService } from 'src/app/services/position.service';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.scss']
})
export class PortfolioDetailsComponent {

  portfolio: any = Portfolio;
  positions: Position[] = [];
  displayedColumns: string[] = ['Värdepaperstyp', 'Företagsnamn', 'Innehav', 'Värde', 'Datum', 'Agera'];
  chart: any;
  positionName: any;
  positionAmount: any; 
  percent: any


  constructor(
    private portfolioService: PortfolioService,
    private activeRoute: ActivatedRoute,
    private positionService: PositionService) { }

  ngOnInit(): void {

    let id: any = this.activeRoute.snapshot.paramMap.get('id')

    this.portfolioService.getPortfolioById(id)
      .subscribe(result => {
        this.portfolio = result
      })

    this.positionService.getPositionsByPortfolioId(id)
      .subscribe((result: Position[]) => {
        this.positions = result,
          this.positionName = this.positions.map((x: any) => x.instrumentName),
          this.positionAmount = this.positions.map((x: any) => x.quantity),
          this.percent = this.positions.map((x: any) => x.percent)

        //Set data to chart
        this.chart = new Chart("myChart", {
         
          type: 'doughnut',
          data: {
            labels: this.positionName,
            datasets: [{
              label: 'Innehav %',
              data: this.percent,
              backgroundColor: ['#ab47bc','#36a2eb','#ffcd56','#689f38','#f44336' ]
            }],
          },          
        })
      });
  }  
}



