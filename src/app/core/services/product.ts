import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  baseUrl = "http://localhost:3000/products";

  private http = inject(HttpClient);

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }

}
