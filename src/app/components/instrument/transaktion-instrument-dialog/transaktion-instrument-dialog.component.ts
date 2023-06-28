import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { TradingService } from 'src/app/services/trading.service';
import { ToastrService } from 'ngx-toastr';
import { Portfolio } from 'src/app/models/portfolio';

@Component({
  selector: 'app-transaktion-instrument-dialog',
  templateUrl: './transaktion-instrument-dialog.component.html',
  styleUrls: ['./transaktion-instrument-dialog.component.scss']
})
export class TransaktionInstrumentDialogComponent implements OnInit {

  tradingForm!: FormGroup;
  portfolios: Portfolio[] = [];

  constructor(private builder: FormBuilder,
    private portfolioService: PortfolioService,
    private tradingService: TradingService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<TransaktionInstrumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.tradingForm = this.builder.group({
      instrumentId: this.builder.control(this.data.instrumentId),
      portfolioId: this.builder.control('', Validators.required),
      createdBy: this.builder.control(1),
      quantity: this.builder.control('', Validators.required),
      //dateCreated: this.builder.control(Date)   
    })

    //Get user portfolios för tradings form select list
    this.portfolioService.getAll()
      .subscribe((result: Portfolio[]) => {
        this.portfolios = result;
      })
  }

  //Send data to DB, reset thr form, close dialog and show tostr succsess
  onSubmit() {
    this.tradingService.createTransaction(this.tradingForm.value)
      .subscribe(res => {
        this.tradingForm.reset();
        this.dialogRef.close();
        this.toastr.success('Överföringen skickades')
      })
  }
}
