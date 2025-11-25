import { Injectable, signal } from '@angular/core';

export interface Toast {
	text: string;
	classname?: string;
	delay?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  
  private readonly _toasts = signal<Toast[]>([]);
	readonly toasts = this._toasts.asReadonly();

	show(text: string, classname = '', delay = 5000) {
    const toast: Toast = { text, classname, delay };
    this._toasts.update((toasts) => [...toasts, toast]);
	}

	remove(toast: Toast) {
		this._toasts.update((toasts) => toasts.filter((t) => t !== toast));
	}

	clear() {
		this._toasts.set([]);
	}
}
