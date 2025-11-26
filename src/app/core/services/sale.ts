import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  
  baseUrl = "http://localhost:3000/sales";

  http = inject(HttpClient);

  getSales():Observable<Sale[]>{
    let url = `${this.baseUrl}?_expand=client&_expand=user`;
    return this.http.get<Sale[]>(url);
  }

}
