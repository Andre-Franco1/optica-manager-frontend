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
    // let url = `${this.baseUrl}?_page=${page}&_expand=client&_expand=user`;
    let url = `${this.baseUrl}?_page=${page}`;
    return this.http.get<Sale[]>(url, {observe: 'response'});
  }

  save(sale: Sale): Observable<void>{
    return this.http.post<void>(this.baseUrl, sale);
  }

  getSaleById(id:number):Observable<Sale>{
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Sale>(url);
  }

}
