import { Component, inject, OnInit } from '@angular/core';
import { Page } from '../../../../core/models/page';
import { Sale } from '../../../../core/models/sale';
import { SaleService } from '../../../../core/services/sale';

@Component({
  selector: 'app-sales-table-page',
  imports: [],
  templateUrl: './sales-table-page.html',
  styleUrl: './sales-table-page.css',
})
export class SalesTablePageComponent implements OnInit {

  saleService = inject(SaleService);

  sales: Sale[] = [];

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.saleService.getSales().subscribe({
      next: sales => this.sales = sales
    });
  }

}
