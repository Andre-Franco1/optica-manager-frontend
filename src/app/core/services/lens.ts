import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lens } from '../models/lens';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LensService {
  
  baseUrl = environment.baseUrl + "/lenses";

  constructor(private http: HttpClient) {}

  getLenses(): Observable<Lens[]> {
    return this.http.get<Lens[]>(this.baseUrl);
  }
}
