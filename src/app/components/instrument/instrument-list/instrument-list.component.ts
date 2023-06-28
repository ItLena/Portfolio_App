import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InstrumentService } from 'src/app/services/instrument.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { InstrumentPerformanceDialogComponent } from '../instrument-performance-dialog/instrument-performance-dialog.component';
import { TransaktionInstrumentDialogComponent } from '../transaktion-instrument-dialog/transaktion-instrument-dialog.component';

@Component({
  selector: 'app-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: ['./instrument-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InstrumentListComponent {

  instruments!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'date', 'type', 'name', 'price', 'performance', 'btn'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private instrumentService: InstrumentService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.instrumentService.getAll()
      .subscribe((result: any) => {
        this.instruments = new MatTableDataSource(result);
        this.instruments.paginator = this.paginator;
        this.instruments.sort = this.sort;

      })
  }


  showInstrumentPerformance(id: number, instrumentName: string) {
    const dialogRef = this.dialog.open(InstrumentPerformanceDialogComponent, {
      width: '800px',
      data: {
        dialogId: id, name: instrumentName
      }
    });
  }

  buyInstrument(id: number, instrumentName: string, price: number) {
    const dialogRef = this.dialog.open(TransaktionInstrumentDialogComponent, {
      width: '500px',
      data: {
        instrumentId: id,
        instrumentName: instrumentName,
        price: price,
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.instruments.filter = filterValue.trim().toLowerCase();

    if (this.instruments.paginator) {
      this.instruments.paginator.firstPage();
    }
  }
}
