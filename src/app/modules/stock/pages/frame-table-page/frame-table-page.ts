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

@Component({
  selector: 'app-frame-table-page',
  imports: [FormsModule, NgbPaginationModule, RouterLink, ModalComponent],
  templateUrl: './frame-table-page.html',
  styleUrl: './frame-table-page.css',
})
export class FrameTablePageComponent implements OnInit {

  frameService = inject(FrameService);
  toastService = inject(ToastService);

  framePage: Page<Frame> = {} as Page<Frame>;
  page = 1;

  frameBrandLabels = FrameBrandLabels;
  frameTypeLabels = FrameTypeLabels;

  nameFilter: string = "";
  selectedFrame !: Frame;

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
}
