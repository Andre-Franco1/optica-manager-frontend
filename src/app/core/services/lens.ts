import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lens } from '../models/lens';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { PaginationService } from './pagination';

@Injectable({
  providedIn: 'root',
})
export class LensService {

  baseUrl = environment.baseUrl + "/lenses";

  private http = inject(HttpClient);
  private paginationService = inject(PaginationService);

  getLensesPage(lensNameFilter: string, page: number): Observable<Page<Lens>> {
    let url = `${this.baseUrl}?name_like=${lensNameFilter}&page=${this.paginationService.toBackend(page)}&limit=10&sort=name`
    return this.http.get<Page<Lens>>(url);
  }

  getLenses(): Observable<Lens[]> {
    return this.http.get<Lens[]>(this.baseUrl);
  }

  getLensById(id: number): Observable<Lens> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Lens>(url);
  }

  save(lens: Lens): Observable<void> {
    return this.http.post<void>(this.baseUrl, lens);
  }

  update(lens: Lens): Observable<void> {
    let url = `${this.baseUrl}/${lens.id}`;
    return this.http.put<void>(url, lens);
  }

  delete(lens: Lens): Observable<void> {
    console.log(lens.id);
    let url = `${this.baseUrl}/${lens.id}`;
    return this.http.delete<void>(url);
  }
}
