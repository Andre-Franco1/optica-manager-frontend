import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Sale } from '../../../../core/models/sale';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { SaleService } from '../../../../core/services/sale';
import { DatePipe, JsonPipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaymentMethod, PaymentMethodLabels } from '../../../../core/enums/payment-method';
import { Client } from '../../../../core/models/client';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';
import { ClientService } from '../../../../core/services/client';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { CardBrand } from '../../../../core/enums/card-brand';
import { ProductService } from '../../../../core/services/product';
import { Product } from '../../../../core/models/product';
import { ProductType } from '../../../../core/enums/product-type';
import { FrameCategory } from '../../../../core/enums/frame-category';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { ToastService } from '../../../../core/services/toast';
import { Status } from '../../../../core/enums/status';

@Component({
  selector: 'app-sale-form-page',
  imports: [ReactiveFormsModule, FormsModule, NgbTypeahead, ModalComponent, DatePipe],
  templateUrl: './sale-form-page.html',
  styleUrl: './sale-form-page.css',
  providers: [JsonPipe]
})
export class SaleFormPageComponent implements OnInit {

  sale: Sale = {} as Sale;

  products: Product[] = [];
  lensProducts: Product[] = [];
  framePrescriptionProducts: Product[] = [];
  frameSolarProducts: Product[] = [];

  formBuilder = inject(FormBuilder);
  saleService = inject(SaleService);
  clientService = inject(ClientService);
  productService = inject(ProductService);
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
  selectedFrameCategory: FrameCategory | null = null;

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
    this.loadProducts();
  }

  searchClients = (text: Observable<string>): Observable<Client[]> => {
    return text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      switchMap(term => this.clientService.getClientsByName(term))
    );
  }

  getSelectedClient(): Client {
    return this.saleForm.controls["client"].value;
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.lensProducts = products.filter(p => p.type === ProductType.Lens);
        this.framePrescriptionProducts = products.filter(p => p.type === ProductType.Frame && p.category === FrameCategory.Prescription);
        this.frameSolarProducts = products.filter(p => p.type === ProductType.Frame && p.category === FrameCategory.Sunglass);
      },
      error: () => alert("Erro ao carregar produtos")
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
    this.selectedFrameCategory = null;
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
    this.selectedFrameCategory = null;
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

  onFrameCategoryChange(selectedFrameCategory: string) {
    this.selectedFrameCategory = selectedFrameCategory ? (selectedFrameCategory as FrameCategory) : null;
  }

  clean() {
    this.saleForm.reset();
    this.sale = {} as Sale;
    while (this.saleItems.length) {
      this.saleItems.removeAt(0);
    }
    this.totalAmount = 0;
    this.selectedProductType = null;
    this.selectedFrameCategory = null;
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
            },
            error: () => {
              this.toastService.show(`Houve um erro ao salvar a venda`, 'bg-danger text-light');
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
    sale.status = Status.Pending;
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
    if (this.selectedProductType !== ProductType.Frame) return [];
    if (this.selectedFrameCategory === FrameCategory.Prescription) {
      return this.framePrescriptionProducts;
    }
    if (this.selectedFrameCategory === FrameCategory.Sunglass) {
      return this.frameSolarProducts;
    }
    return [];
  }

}
