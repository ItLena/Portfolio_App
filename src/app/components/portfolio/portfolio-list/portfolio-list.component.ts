import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent implements OnInit {

  portfolio!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'dateCreated', 'benchmarkDescription', 'personName', 'link'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private portfolioService: PortfolioService, private router: Router) { }

  ngOnInit(): void {
    this.portfolioService.getAll()
      .subscribe((result: any) => {
        this.portfolio = new MatTableDataSource(result);
        this.portfolio.paginator = this.paginator;
        this.portfolio.sort = this.sort;
      })
  }

  showDetails(id: any) {
    this.router.navigate(['/portfolios' + '/' + id])
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.portfolio.filter = filterValue.trim().toLowerCase();

    if (this.portfolio.paginator) {
      this.portfolio.paginator.firstPage();
    }
  }
}
