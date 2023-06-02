import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portfolio, Position, Performance, Risk } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { PositionService } from 'src/app/services/position.service';
import { Chart, registerables } from 'chart.js'
import { PerformanceService } from 'src/app/services/performance.service';
import { RiskService } from 'src/app/services/risk.service';
Chart.register(...registerables);

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.scss']
})
export class PortfolioDetailsComponent {

  portfolio: any = Portfolio;
  positions: Position[] = [];
  performances: Performance[] = [];
  risk: any = Risk;
  displayedColumns: string[] = ['Värdepaperstyp', 'Företagsnamn', 'Innehav', 'Värde', 'Datum', 'Agera'];

  positionChart: any;
  performanceChart: any;
  positionName: any;
  positionAmount: any;
  percent: any;
  portfolioPerformance: any;
  benchmarkPerformance: any;
  performanceDate: any;


  constructor(
    private portfolioService: PortfolioService,
    private activeRoute: ActivatedRoute,
    private positionService: PositionService,
    private performanceService: PerformanceService,
    private riskService: RiskService) { }

  ngOnInit(): void {

    //Get portfolio Id
    let id: any = this.activeRoute.snapshot.paramMap.get('id');

    //Get Portfolio details
    this.portfolioService.getPortfolioById(id)
      .subscribe(result => {
        this.portfolio = result
      });

    //Get Risks data
    this.riskService.getRisksByPortfolioId(id)
      .subscribe(result => {
        this.risk = result
      });

    //Getting positions list with ditails and setting data for Pie Chart
    this.positionService.getPositionsByPortfolioId(id)
      .subscribe((result: Position[]) => {
        this.positions = result,
          this.positionName = this.positions.map((x: any) => x.instrumentName),
          this.positionAmount = this.positions.map((x: any) => x.quantity),
          this.percent = this.positions.map((x: any) => x.percent)
        //Set data to chart
        this.positionChart = new Chart("positionChart", {
          type: 'doughnut',
          data: {
            labels: this.positionName,
            datasets: [{
              label: 'Innehav %',
              data: this.percent,
              backgroundColor: ['#ab47bc', '#36a2eb', '#ffcd56', '#689f38', '#f44336']
            }],
          },
        })
      });

    //Getting performances data and setting it to multiple Line Chart
    this.performanceService.getPerformancesByPortfolioId(id)
      .subscribe((result: Performance[]) => {
        this.performances = result,
          this.performanceDate = this.performances.map((x: any) => x.date),
          this.portfolioPerformance = this.performances.map((x: any) => x.portfolioPerformance),
          this.benchmarkPerformance = this.performances.map((x: any) => x.benchmarkPerformance)

        //Set data to chart
        this.performanceChart = new Chart("performanceChart", {
          type: 'line',
          data: {
            labels: this.performanceDate,
            datasets: [
              {
                label: 'Portfölj',
                data: this.portfolioPerformance,
                backgroundColor: '#ab47bc',
                borderColor: '#ab47bc',
                yAxisID: 'y',
                fill: false,
              },
              {
                label: 'Benchmark',
                data: this.benchmarkPerformance,
                backgroundColor: '#36a2eb',
                borderColor: '#36a2eb',
                yAxisID: 'y',
              },
            ],
          },
          // options: {
          //   scales: {
          //     xAxes: {
          //       type: 'time',
          //       time: {
          //         parser: 'MM/DD/YYYY HH:mm',
          //         tooltipFormat: 'll HH:mm',
          //         unit: 'day',                  
          //         displayFormats: {
          //           'day': 'MM/DD/YYYY'
          //         }
          //       }
          //     },
          //   }
          // }
        }
        );
      }) 
    
  }
}


