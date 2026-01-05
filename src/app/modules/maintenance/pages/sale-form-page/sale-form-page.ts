import { DatePipe, JsonPipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap } from 'rxjs';
import { CardBrand } from '../../../../core/enums/card-brand';
import { FrameType } from '../../../../core/enums/frame-type';
import { PaymentMethod, PaymentMethodLabels } from '../../../../core/enums/payment-method';
import { ProductType } from '../../../../core/enums/product-type';
import { SaleStatus } from '../../../../core/enums/sale-status';
import { Client } from '../../../../core/models/client';
import { Frame } from '../../../../core/models/frame';
import { Lens } from '../../../../core/models/lens';
import { Sale } from '../../../../core/models/sale';
import { ClientService } from '../../../../core/services/client';
import { FrameService } from '../../../../core/services/frame';
import { LensService } from '../../../../core/services/lens';
import { SaleService } from '../../../../core/services/sale';
import { ToastService } from '../../../../core/services/toast';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-sale-form-page',
  imports: [ReactiveFormsModule, FormsModule, NgbTypeahead, ModalComponent, DatePipe, DecimalPipe],
  templateUrl: './sale-form-page.html',
  styleUrl: './sale-form-page.css',
  providers: [JsonPipe]
})
export class SaleFormPageComponent implements OnInit {

  sale: Sale = {} as Sale;

  lenses: Lens[] = [];
  prescriptionFrames: Frame[] = [];
  sunglassFrames: Frame[] = [];

  formBuilder = inject(FormBuilder);
  saleService = inject(SaleService);
  clientService = inject(ClientService);
  frameService= inject(FrameService);
  lensService= inject(LensService);
  toastService = inject(ToastService);
  location = inject(Location);
  router = inject(ActivatedRoute);
  jsonPipe = inject(JsonPipe);
  cd = inject(ChangeDetectorRef);

  productTypes = Object.values(ProductType);
  paymentMethods = Object.values(PaymentMethod);
  paymentMethodLabels = PaymentMethodLabels;
  cardBrands = Object.values(CardBrand);
  installmentsList = Array.from({ length: 10 }, (_, i) => i + 1);

  showSaleItemForm = false;

  totalAmount: number = 0;

  selectedProductType: ProductType | null = null;
  selectedFrameType: FrameType | null = null;

  saleForm: FormGroup = this.formBuilder.group({
    client: ['', Validators.required],
    saleItems: this.formBuilder.array([]),
    estimatedDeliveryDate: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    cardBrand: [{ value: null, disabled: true }],
    installments: [{ value: null, disabled: true }],
    comments: ['']
  });

  saleItemForm = this.formBuilder.group({
    product: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0)]]
  });

  // Used by typeahed component
  formatter = (client: Client) => client.name;

  ngOnInit(): void {
    this.loadFrames();
    this.loadLenses();
  }

  searchClients = (text: Observable<string>): Observable<Client[]> => {
    return text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      switchMap(term => this.clientService.getClientsByName(term)),
      map( page => page.content || [])
    );
  }

  getSelectedClient(): Client {
    return this.saleForm.controls["client"].value;
  }

  loadFrames() {
    this.frameService.getFrames().subscribe({
      next: frames => {
        this.prescriptionFrames = frames.filter(
          f => f.frameType === 'PRESCRIPTION'
        );

        this.sunglassFrames = frames.filter(
          f => f.frameType === 'SUNGLASS'
        );
      },
      error: () => alert("Erro ao carregar armações.")
    });
  }

  loadLenses() {
    this.lensService.getLenses().subscribe({
      next: lenses => {
        this.lenses = lenses;
      },
      error: () => alert("Erro ao carregar lentes.")
    });
  }

  onPaymentMethodChange() {
    const paymentMethod = this.saleForm.get('paymentMethod')!.value;
    const cardBrand = this.saleForm.get('cardBrand')!;
    const installments = this.saleForm.get('installments')!;

    if (paymentMethod === 'CREDIT_CARD') {
      cardBrand.enable();
      installments.enable();

      cardBrand.setValidators([Validators.required]);
      installments.setValidators([Validators.required]);
    }
    else {
      cardBrand.clearValidators();
      installments.clearValidators();

      cardBrand.disable();
      installments.disable();

      cardBrand.setValue(null);
      installments.setValue(null);
    }
    cardBrand.updateValueAndValidity();
    installments.updateValueAndValidity();
  }

  openSaleItemForm() {
    this.showSaleItemForm = true;
    this.cd.detectChanges();
  }

  removeSaleItem(index: number) {
    this.saleItems.removeAt(index);
    this.calculateTotal();

  }

  cancelSaleItem() {
    this.saleItemForm.reset();
    this.selectedProductType = null;
    this.selectedFrameType = null;
    this.showSaleItemForm = false;
  }

  saveSaleItem() {
    if (this.saleItemForm.invalid) {
      this.saleItemForm.markAllAsTouched();
      return;
    }

    const data = this.saleItemForm.value;

    this.saleItems.push(this.formBuilder.group({
      product: [data.product],
      price: [data.price]
    }));

    this.calculateTotal();
    alert(this.jsonPipe.transform(this.saleItems.value));

    this.saleItemForm.reset();
    this.selectedProductType = null;
    this.selectedFrameType = null;
    this.showSaleItemForm = false;

  }

  calculateTotal() {
    this.totalAmount = this.saleItems.controls
      .map(ctrl => ctrl.value.price || 0)
      .reduce((acc, curr) => acc + curr, 0);
  }

  onProductTypeChange(selectProductType: string) {
    this.selectedProductType = selectProductType ? (selectProductType as ProductType) : null;
  }

  onFrameTypeChange(selectedFrameType: string) {
    this.selectedFrameType = selectedFrameType ? (selectedFrameType as FrameType) : null;
  }

  clean() {
    this.saleForm.reset();
    this.sale = {} as Sale;
    while (this.saleItems.length) {
      this.saleItems.removeAt(0);
    }
    this.totalAmount = 0;
    this.selectedProductType = null;
    this.selectedFrameType = null;
    this.showSaleItemForm = false;
  }

  createSale(modalConfirm: ModalComponent) {
    //checkEmptySaleItem();

    if (this.isSaleValid()) {
      this.sale = this.createSaleObject();

      modalConfirm.open({ size: "lg" }).then(confirm => {
        if (confirm) {
          this.saleService.save(this.sale).subscribe({
            next: () => {
              this.toastService.show(`Venda cadastrada com sucesso!`, 'bg-success text-light');
              this.clean();
              this.location.back();
            },
            error: () => {
              this.toastService.show(`Houve um erro ao salvar a venda`, 'bg-danger text-light');
              this.location.back();
            }
          });
        }
      });
    }
  }

  private createSaleObject(): Sale {
    let sale: Sale = {} as Sale;
    sale = {...this.saleForm.value};
    sale.issueDate = new Date();
    sale.deliveryDate = null;
    sale.totalAmount = this.totalAmount;
    sale.saleStatus = SaleStatus.Pending;
    sale.user = {id: 1};
    //user, prescription
    return sale;
  }

  private isSaleValid(): boolean {
    return this.saleForm.valid && this.saleItems.length > 0;
  }

  cancel() {
    this.location.back();
  }





  get sfClient() {
    return this.saleForm.get('client');
  }

  get saleItems() {
    return this.saleForm.get('saleItems') as FormArray;
  }

  get sfEstimatedDeliveryDate() {
    return this.saleForm.get('estimatedDeliveryDate');
  }

  get sfPaymentMethod() {
    return this.saleForm.get('paymentMethod');
  }

  get sfCardBrand() {
    return this.saleForm.get('cardBrand');
  }

  get sfInstallments() {
    return this.saleForm.get('cardBrand');
  }

  get sfComments() {
    return this.saleForm.get('comments');
  }

  get filteredFrameProducts() {
    if (this.selectedFrameType === FrameType.Prescription) {
      return this.prescriptionFrames;
    }
    if (this.selectedFrameType === FrameType.Sunglass) {
      return this.sunglassFrames;
    }
    return [];
  }

  get lensProducts() {
    return this.lenses;
  }

}
