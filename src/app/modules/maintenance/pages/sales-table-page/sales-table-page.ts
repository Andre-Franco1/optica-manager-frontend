import { Component, inject, OnInit } from '@angular/core';
import { Page } from '../../../../core/models/page';
import { Sale } from '../../../../core/models/sale';
import { SaleService } from '../../../../core/services/sale';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sales-table-page',
  imports: [NgbPaginationModule],
  templateUrl: './sales-table-page.html',
  styleUrl: './sales-table-page.css',
})
export class SalesTablePageComponent implements OnInit {

  saleService = inject(SaleService);

  salePage: Page<Sale> = {} as Page<Sale>;
  page = 1;

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.saleService.getSales(this.page).subscribe({
      next: response => {
        this.salePage.content = response.body;
        this.salePage.numberOfElements = parseInt(response.headers.get("X-Total-Count") || "0");
      }
    });
  }

  pageChange(){
    this.loadSales();
  }

}
