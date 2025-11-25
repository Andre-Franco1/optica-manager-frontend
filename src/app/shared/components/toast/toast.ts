import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  imports: [NgbToastModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}
