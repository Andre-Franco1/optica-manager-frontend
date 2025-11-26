import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  
  baseUrl = "http://localhost:3000/sales";

  http = inject(HttpClient);

  getSales(page: number):Observable<HttpResponse<Sale[]>>{
    let url = `${this.baseUrl}?_page=${page}&_expand=client&_expand=user`;
    return this.http.get<Sale[]>(url, {observe: 'response'});
  }

}
