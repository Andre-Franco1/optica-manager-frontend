import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../../../core/models/page';
import { Sale } from '../../../../core/models/sale';
import { SaleService } from '../../../../core/services/sale';
import { PaymentMethodLabels } from '../../../../core/enums/payment-method';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { SaleStatus } from '../../../../core/enums/sale-status';

@Component({
  selector: 'app-sales-history-table-page',
  imports: [NgbPaginationModule, DecimalPipe, DatePipe, ModalComponent],
  templateUrl: './sales-history-table-page.html',
  styleUrl: './sales-history-table-page.css',
})
export class SalesHistoryTablePageComponent implements OnInit {

  saleService = inject(SaleService);

  salePage: Page<Sale> = {} as Page<Sale>;
  page = 1;

  selectedSale !: Sale;

  paymentMethodLabels = PaymentMethodLabels;

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.saleService.getSalesPageByStatus(this.page, SaleStatus.Completed).subscribe({
      next: response => {
        this.salePage = response;
      }
    });
  }

  pageChange() {
    this.loadSales();
  }

  info(sale: Sale, modalInfo: ModalComponent) {
      this.selectedSale = sale;
      modalInfo.open({ size: "lg" });
  
    }
}
