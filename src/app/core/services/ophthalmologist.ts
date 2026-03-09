import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationService } from './pagination';
import { Observable } from 'rxjs';
import { Ophthalmologist } from '../models/ophthalmologist';

@Injectable({
  providedIn: 'root',
})
export class OphthalmologistService {

  baseUrl = environment.baseUrl + "/ophthalmologists";

  private http = inject(HttpClient);
  private paginationService = inject(PaginationService);

  getOphthalmologists(): Observable<Ophthalmologist[]> {
      return this.http.get<Ophthalmologist[]>(this.baseUrl);
    }
  
    getOphthalmologistById(id: number): Observable<Ophthalmologist> {
      let url = `${this.baseUrl}/${id}`;
      return this.http.get<Ophthalmologist>(url);
    }
}
