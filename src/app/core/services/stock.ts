import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockRequest } from '../models/stock-request';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  baseUrl = environment.baseUrl + "/frames";

  private http = inject(HttpClient);

  increaseStock(frameId: number, request: StockRequest): Observable<void> {
    let url = `${this.baseUrl}/${frameId}/stock/entry`;
    return this.http.post<void>(url, request);
  }

  decreaseStock(frameId: number, request: StockRequest): Observable<void> {
    let url = `${this.baseUrl}/${frameId}/stock/exit`;
    return this.http.post<void>(url, request);
  }
}
