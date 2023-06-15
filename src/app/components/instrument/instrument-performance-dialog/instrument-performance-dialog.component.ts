import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from 'chart.js';
import { Instrument, InstrumentPerformance } from 'src/app/models/instrument';
import { InstrumentService } from 'src/app/services/instrument.service';

@Component({
  selector: 'app-instrument-performance-dialog',
  templateUrl: './instrument-performance-dialog.component.html',
  styleUrls: ['./instrument-performance-dialog.component.scss']
})
export class InstrumentPerformanceDialogComponent implements OnInit{
 
  performanceChart: any;
  performances: InstrumentPerformance[] = [];
  instrumentPerformance: any;
  date: any;

  constructor(private instrumentService: InstrumentService,
     @Inject(MAT_DIALOG_DATA) public data: any) { }
 
  ngOnInit(): void {

    //Getting performances data and setting it to multiple Line Chart
    this.instrumentService.getPerformancesByInstrumentId(this.data.dialogId)
      .subscribe((result: any) => {
        this.performances = result,
          this.date = this.performances.map((x: any) => x.date),
          this.instrumentPerformance = this.performances.map((x: any) => x.instrumentPerformance),
                  
          //Set data to chart
          this.performanceChart = new Chart("performanceChart", {
            type: 'line',
            data: {
              labels: this.date,
              datasets: [
                {
                  label: this.data.name,
                  data: this.instrumentPerformance,
                  backgroundColor: '#689f38',
                  borderColor: '#689f38',
                  yAxisID: 'y',
                  fill: false,
                }
              ]
            }  
          })
      }); 
      console.log('id', this.data);
  }

 
}
