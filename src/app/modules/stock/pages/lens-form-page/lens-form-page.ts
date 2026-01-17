import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LensBrand, LensBrandLabels } from '../../../../core/enums/lens-brand';
import { LensIndex, LensIndexLabels } from '../../../../core/enums/lens-index';
import { LensMaterial, LensMaterialLabels } from '../../../../core/enums/lens-material';
import { LensType, LensTypeLabels } from '../../../../core/enums/lens-type';
import { LensService } from '../../../../core/services/lens';
import { ToastService } from '../../../../core/services/toast';
import { LensTreatment, LensTreatmentLabels } from '../../../../core/enums/lens-treatment';

@Component({
  selector: 'app-lens-form-page',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './lens-form-page.html',
  styleUrl: './lens-form-page.css',
})
export class LensFormPageComponent {
  isEditing: boolean = false;

  formBuilder = inject(FormBuilder);
  lensService = inject(LensService);
  location = inject(Location);
  router = inject(ActivatedRoute);
  toastService = inject(ToastService);

  lensBrands = Object.values(LensBrand);
  lensBrandLabels = LensBrandLabels;
  lensIndexes = Object.values(LensIndex);
  lensIndexLabels = LensIndexLabels;
  lensTypes = Object.values(LensType);
  lensTypeLabels = LensTypeLabels;
  lensMaterials = Object.values(LensMaterial);
  lensMaterialLabels = LensMaterialLabels;
  lensTreatments = Object.values(LensTreatment);
  lensTreatmentLabels = LensTreatmentLabels;

  lensForm: FormGroup = this.formBuilder.group({
    id: [''],
    code: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    brand: ['', [Validators.required]],
    index: ['', [Validators.required]],
    material: ['', [Validators.required]],
    type: ['', [Validators.required]],
    treatments: [[], [Validators.required]]
  });

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      let lensId = Number(params.get("id") ?? "0");
      if (lensId) {
        this.loadLens(lensId);
        this.isEditing = true;
      }
    })
  }

  loadLens(lensId: number) {
    this.lensService.getLensById(lensId).subscribe({
      next: lens => this.lensForm.setValue(lens),
      error: () => alert("Erro ao carregar lente")
    })
  }

  toggleTreatment(t: LensTreatment) {
    const current = this.lensForm.value.treatments as LensTreatment[];

    if (current.includes(t)) {
      this.lensForm.patchValue({
        treatments: current.filter(x => x !== t)
      });
    } else {
      this.lensForm.patchValue({
        treatments: [...current, t]
      });
    }
  }

  save() {
    if (this.lensForm.valid) {
      if (this.isEditing) {
        this.lensService.update(this.lensForm.value).subscribe(
          {
            next: () => {
              this.toastService.show("Lente atualizada com sucesso!", "bg-success text-light");
              this.location.back();
            },
            error: () => this.toastService.show('Houve um erro ao atualizar a lemnte!', 'bg-danger text-light')
          }
        );
      }
      else {
        this.lensService.save(this.lensForm.value).subscribe(
          {
            next: () => {
              this.toastService.show("Lente cadastrada com sucesso!", "bg-success text-light");
              this.location.back();
            },
            error: () => this.toastService.show('Houve um erro ao cadastrar a lente!', 'bg-danger text-light')
          }
        );
      }
    }
  }

  cancel() {
    this.location.back();
  }

  get lfCode() { return this.lensForm.get("code") }
  get lfName() { return this.lensForm.get("name") }
  get lfBrand() { return this.lensForm.get("brand") }
  get lfIndex() { return this.lensForm.get("index") }
  get lfMaterial() { return this.lensForm.get("material") }
  get lfType() { return this.lensForm.get("type") }
  get lfTreatments() { return this.lensForm.get("treatments"); }

}
