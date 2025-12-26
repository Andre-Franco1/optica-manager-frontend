import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  
  baseUrl = environment.baseUrl + "/sales";

  http = inject(HttpClient);

  getSalesPage(page: number):Observable<Page<Sale>>{
    // let url = `${this.baseUrl}?_page=${page}&_expand=client&_expand=user`;
    let url = `${this.baseUrl}?_page=${page}`;
    return this.http.get<Page<Sale>>(url);
  }

  save(sale: Sale): Observable<void>{
    return this.http.post<void>(this.baseUrl, sale);
  }

  getSaleById(id:number):Observable<Sale>{
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Sale>(url);
  }

}
