import { Location } from '@angular/common';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Prescription } from '../../../../core/models/prescription';
import { PrescriptionService } from '../../../../core/services/prescription';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast';

@Component({
  selector: 'app-prescription-table-page',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './prescription-table-page.html',
  styleUrl: './prescription-table-page.css',
})
export class PrescriptionTablePageComponent {

  @Input() clientId!: number;

  prescriptions: Prescription[] = [];
  ophthalmologists = [
    { id: 1, name: 'Dr. Carlos Silva' },
    { id: 2, name: 'Dra. Mariana Souza' },
    { id: 3, name: 'Dr. Rafael Almeida' }
  ];

  showPrescriptionForm = false;

  prescriptionForm: FormGroup;

  toastService = inject(ToastService);
  location = inject(Location);

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService) {
    this.prescriptionForm = this.fb.group({
      date: [null],

      // DISTANCE - OD
      distanceOdSpherical: [null],
      distanceOdCylindrical: [null],
      distanceOdAxis: [null],
      distanceOdDnp: [null],
      distanceOdAddition: [null],

      // DISTANCE - OS
      distanceOsSpherical: [null],
      distanceOsCylindrical: [null],
      distanceOsAxis: [null],
      distanceOsDnp: [null],
      distanceOsAddition: [null],

      distanceDp: [null],

      // NEAR - OD
      nearOdSpherical: [null],
      nearOdCylindrical: [null],
      nearOdAxis: [null],
      nearOdDnp: [null],
      nearOdHeight: [null],

      // NEAR - OS
      nearOsSpherical: [null],
      nearOsCylindrical: [null],
      nearOsAxis: [null],
      nearOsDnp: [null],
      nearOsHeight: [null],

      nearDp: [null],

      ophthalmologistId: [null],
      notes: ['']

    });
  }

  ngOnInit() {
    this.loadPrescriptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clientId'] && this.clientId) {
      this.loadPrescriptions();
      this.showPrescriptionForm = false;

    }
  }

  loadPrescriptions() {
    this.prescriptionService.getByClient(this.clientId).subscribe({
      next: response => {
        this.prescriptions = response;
      }
    });
  }

  togglePrescriptionForm(): void {
    this.showPrescriptionForm = !this.showPrescriptionForm;

    if (!this.showPrescriptionForm) {
      this.prescriptionForm.reset();
    }
  }

  cancel(): void {
    this.showPrescriptionForm = false;
    this.prescriptionForm.reset();
  }

  save() {
    if (this.prescriptionForm.valid) {
      this.prescriptionService.save(this.clientId, this.prescriptionForm.value).subscribe(
        {
          next: () => {
            this.toastService.show("Receita cadastrada com sucesso!", "bg-success text-light");
            this.prescriptionForm.reset();
            this.showPrescriptionForm = false;
            this.loadPrescriptions();
          },
          error: () => this.toastService.show('Houve um erro ao cadastrar a receita!', 'bg-danger text-light')
        }
      );
    }
  }

  delete(clientId: number, prescriptionId: number) {
    this.prescriptionService.delete(clientId, prescriptionId).subscribe({
      next: () => {
        this.toastService.show("Receita removida com sucesso!", "bg-success text-light");
        this.loadPrescriptions();
      },
      error: () => {
        this.toastService.show('Houve um erro ao remover a receita!', 'bg-danger text-light')
      }
    });

  }

}
