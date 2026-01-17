import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../../../core/models/page';
import { Sale } from '../../../../core/models/sale';
import { SaleService } from '../../../../core/services/sale';
import { PaymentMethodLabels } from '../../../../core/enums/payment-method';

@Component({
  selector: 'app-sales-table-page',
  imports: [NgbPaginationModule, RouterLink, DecimalPipe, DatePipe],
  templateUrl: './sales-table-page.html',
  styleUrl: './sales-table-page.css',
})
export class SalesTablePageComponent implements OnInit {

  saleService = inject(SaleService);

  salePage: Page<Sale> = {} as Page<Sale>;
  page = 1;

  paymentMethodLabels = PaymentMethodLabels;

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.saleService.getSalesPage(this.page).subscribe({
      next: response => {
        this.salePage = response;
      }
    });
  }

  pageChange(){
    this.loadSales();
  }

}
