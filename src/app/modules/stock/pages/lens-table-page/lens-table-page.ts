import { Component, inject, OnInit } from '@angular/core';
import { LensService } from '../../../../core/services/lens';
import { ToastService } from '../../../../core/services/toast';
import { Lens } from '../../../../core/models/lens';
import { Page } from '../../../../core/models/page';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { RouterLink } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LensBrandLabels } from '../../../../core/enums/lens-brand';
import { LensIndexLabels } from '../../../../core/enums/lens-index';
import { LensMaterialLabels } from '../../../../core/enums/lens-material';
import { LensTreatment, LensTreatmentLabels } from '../../../../core/enums/lens-treatment';
import { LensTypeLabels } from '../../../../core/enums/lens-type';

@Component({
  selector: 'app-lens-table-page',
  imports: [FormsModule, NgbPaginationModule, RouterLink, ModalComponent],
  templateUrl: './lens-table-page.html',
  styleUrl: './lens-table-page.css',
})
export class LensTablePageComponent implements OnInit {

  lensService = inject(LensService);
  toastService = inject(ToastService);

  lensPage: Page<Lens> = {} as Page<Lens>;
  page = 1;

  lensBrandLabels = LensBrandLabels;
  lensIndexLabels = LensIndexLabels;
  lensMaterialLabels = LensMaterialLabels;
  lensTreatmentLabels = LensTreatmentLabels;
  lensTypeLabels = LensTypeLabels;

  nameFilter: string = "";
  selectedLens !: Lens;

  ngOnInit(): void {
    this.loadLenses();
  }

  loadLenses() {
    this.lensService.getLensesPage(this.nameFilter, this.page).subscribe({
      next: response => {
        this.lensPage = response;
      }
    });
  }

  pageChange() {
    this.loadLenses();
  }

  filterByName() {
    this.loadLenses();
  }

  formatTreatments(treatments: LensTreatment[]): string {
    return treatments.map(t => this.lensTreatmentLabels[t]).join(', ');
  }

  delete(lens: Lens, modalConfirm: ModalComponent) {
    this.selectedLens = lens;
    modalConfirm.open().then(confirm => {
      if (confirm) {
        this.lensService.delete(lens).subscribe({
          next: () => {
            this.toastService.show("Lente removida com sucesso!", "bg-success text-light");
            this.loadLenses();
          },
          error: () => {
            this.toastService.show('Houve um erro ao remover a lente!', 'bg-danger text-light')
          }
        });
      }
    })

  }

}
