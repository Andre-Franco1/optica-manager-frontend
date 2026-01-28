import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lens } from '../models/lens';
import { Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class LensService {

  baseUrl = environment.baseUrl + "/lenses";

  constructor(private http: HttpClient) { }

  getLensesPage(lensNameFilter: string, page: number): Observable<Page<Lens>> {
    let url = `${this.baseUrl}?name_like=${lensNameFilter}&_page=${page}&_limit=10&_sort=name`
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
