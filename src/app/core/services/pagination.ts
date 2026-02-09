import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  
  toBackend(page: number): number {
    return Math.max(page - 1, 0);
  }

  toFrontend(page: number): number {
    return page + 1;
  }
}
