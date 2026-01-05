import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FrameService } from '../../../../core/services/frame';
import { ToastService } from '../../../../core/services/toast';
import { FrameBrand, FrameBrandLabels } from '../../../../core/enums/frame-brand';
import { FrameType, FrameTypeLabels } from '../../../../core/enums/frame-type';

@Component({
  selector: 'app-frame-form-page',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './frame-form-page.html',
  styleUrl: './frame-form-page.css',
})
export class FrameFormPageComponent implements OnInit {

  isEditing: boolean = false;

  formBuilder = inject(FormBuilder);
  frameService = inject(FrameService);
  location = inject(Location);
  router = inject(ActivatedRoute);
  toastService = inject(ToastService);

  frameBrands = Object.values(FrameBrand);
  frameBrandLabels = FrameBrandLabels;

  frameTypes = Object.values(FrameType);
  frameTypeLabels = FrameTypeLabels;

  frameForm: FormGroup = this.formBuilder.group({
    id: [''],
    code: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    frameBrand: ['', [Validators.required]],
    frameType: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      let frameId = Number(params.get("id") ?? "0");
      if (frameId) {
        this.loadFrame(frameId);
        this.isEditing = true;
      }
    })
  }

  loadFrame(frameId: number) {
    this.frameService.getFrameById(frameId).subscribe({
      next: frame => this.frameForm.setValue(frame),
      error: () => alert("Erro ao carregar armação")
    })
  }

  save() {
    if (this.frameForm.valid) {
      if (this.isEditing) {
        this.frameService.update(this.frameForm.value).subscribe(
          {
            next: () => {
              this.toastService.show("Armação atualizada com sucesso!", "bg-success text-light");
              this.location.back();
            },
            error: () => this.toastService.show('Houve um erro ao atualizar a armação!', 'bg-danger text-light')
          }
        );
      }
      else {
        this.frameService.save(this.frameForm.value).subscribe(
          {
            next: () => {
              this.toastService.show("Armação cadastrada com sucesso!", "bg-success text-light");
              this.location.back();
            },
            error: () => this.toastService.show('Houve um erro ao cadastrar a armação!', 'bg-danger text-light')
          }
        );
      }
    }
  }

  cancel() {
    this.location.back();
  }

  get ffCode() { return this.frameForm.get("code") }
  get ffName() { return this.frameForm.get("name") }
  get ffFrameBrand() { return this.frameForm.get("frameBrand") }
  get ffFrameType() { return this.frameForm.get("frameType") }
}
