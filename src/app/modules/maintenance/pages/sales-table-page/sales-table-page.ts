import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../../../core/models/page';
import { Sale } from '../../../../core/models/sale';
import { SaleService } from '../../../../core/services/sale';
import { PaymentMethodLabels } from '../../../../core/enums/payment-method';
import { SaleStatus } from '../../../../core/enums/sale-status';
import { ToastService } from '../../../../core/services/toast';

@Component({
  selector: 'app-sales-table-page',
  imports: [NgbPaginationModule, RouterLink, DecimalPipe, DatePipe],
  templateUrl: './sales-table-page.html',
  styleUrl: './sales-table-page.css',
})
export class SalesTablePageComponent implements OnInit {

  saleService = inject(SaleService);
  toastService = inject(ToastService);


  salePage: Page<Sale> = {} as Page<Sale>;
  page = 1;

  paymentMethodLabels = PaymentMethodLabels;

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales() {
    this.saleService.getSalesPageByStatus(this.page, SaleStatus.Pending).subscribe({
      next: response => {
        this.salePage = response;
      }
    });
  }

  pageChange() {
    this.loadSales();
  }

  downloadServiceOrder(saleId: number) {
    this.saleService.downloadServiceOrder(saleId)
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
        },
        error: () => {
          this.toastService.show('Houve um erro ao gerar a OS', 'bg-danger text-light')
        }
      });
  }

  /*
  downloadServiceOrder(saleId: number) {
    this.saleService.downloadServiceOrder(saleId)
      .subscribe({
        next: (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          //a.download = `service-order-${saleId}.pdf`;
          a.click();

          window.URL.revokeObjectURL(url);
        },
        error: () => {
          alert('Erro ao gerar PDF');
        }
      });
  }
  */

}
