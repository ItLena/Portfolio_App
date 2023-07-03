import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TradingService } from 'src/app/services/trading.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-trading-list',
  templateUrl: './trading-list.component.html',
  styleUrls: ['./trading-list.component.scss']
})
export class TradingListComponent implements OnInit {
 
  trading!: MatTableDataSource<any>;
  displayedColumns: string[] = ['dateCreated', 'instrumentName', 'quantity', 'portfolioName'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tradingService: TradingService) { }

  ngOnInit(): void {
    this.tradingService.getAll()
      .subscribe((result: any) => {
        this.trading = new MatTableDataSource(result);
        this.trading.paginator = this.paginator;
        this.trading.sort = this.sort;
      })
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.trading.filter = filterValue.trim().toLowerCase();

    if (this.trading.paginator) {
      this.trading.paginator.firstPage();
    }
  }

}
