import { Component, inject, OnInit } from '@angular/core';
import { FrameService } from '../../../../core/services/frame';
import { ToastService } from '../../../../core/services/toast';
import { Frame } from '../../../../core/models/frame';
import { Page } from '../../../../core/models/page';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { FrameBrandLabels } from '../../../../core/enums/frame-brand';
import { FrameTypeLabels } from '../../../../core/enums/frame-type';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StockService } from '../../../../core/services/stock';
import { StockMovementType } from '../../../../core/enums/stock-movement-type';
import { StockRequest } from '../../../../core/models/stock-request';

@Component({
  selector: 'app-frame-table-page',
  imports: [FormsModule, NgbPaginationModule, RouterLink, ModalComponent, ReactiveFormsModule],
  templateUrl: './frame-table-page.html',
  styleUrl: './frame-table-page.css',
})
export class FrameTablePageComponent implements OnInit {

  frameService = inject(FrameService);
  stockService = inject(StockService);
  toastService = inject(ToastService);
  formBuilder = inject(FormBuilder);

  framePage: Page<Frame> = {} as Page<Frame>;
  page = 1;

  frameBrandLabels = FrameBrandLabels;
  frameTypeLabels = FrameTypeLabels;

  nameFilter: string = "";
  selectedFrame !: Frame;

  stockMovementTypes = StockMovementType;
  
  modalTitle = '';
  selectedStockMovementType!: StockMovementType;

  stockForm: FormGroup = this.formBuilder.group({
    quantity: ['', [Validators.required, Validators.min(1)]],
    comment: ['']
  });

  ngOnInit(): void {
    this.loadFrames();
  }

  loadFrames() {
    this.frameService.getFramesPage(this.nameFilter, this.page).subscribe({
      next: response => {
        this.framePage = response;
      }
    });
  }

  pageChange() {
    this.loadFrames();
  }

  filterByName() {
    this.loadFrames();
  }

  delete(frame: Frame, modalConfirm: ModalComponent) {
    this.selectedFrame = frame;
    modalConfirm.open().then(confirm => {
      if (confirm) {
        this.frameService.delete(frame).subscribe({
          next: () => {
            this.toastService.show("Armação removida com sucesso!", "bg-success text-light");
            this.loadFrames();
          },
          error: () => {
            this.toastService.show('Houve um erro ao remover a armação!', 'bg-danger text-light')
          }
        });
      }
    })
  }

  stock(frame: Frame, type: StockMovementType, modal: ModalComponent) {

  this.selectedFrame = frame;
  this.selectedStockMovementType = type;

  this.modalTitle =
    type === this.stockMovementTypes.ENTRY
      ? 'Adicionar Estoque'
      : 'Remover Estoque';

  this.stockForm.reset();

  modal.open().then(confirm => {

    if (!confirm) return;

    if (this.stockForm.invalid || !this.selectedFrame) {
      this.stockForm.markAllAsTouched();
      return;
    }

    const { quantity, comment } = this.stockForm.getRawValue();

    const payload: StockRequest = {
      quantity: Number(quantity),
      comment: comment || undefined
    };

    const action$ =
      this.selectedStockMovementType === this.stockMovementTypes.ENTRY
        ? this.stockService.increaseStock(this.selectedFrame.id, payload)
        : this.stockService.decreaseStock(this.selectedFrame.id, payload);

    action$.subscribe({
      next: () => {
        this.toastService.show("Estoque atualizado com sucesso!", "bg-success text-light");
        this.loadFrames();
      },
      error: () => {
        this.toastService.show('Houve um erro ao atualizar o estoque', 'bg-danger text-light')
      }
    });

  });
}
}
