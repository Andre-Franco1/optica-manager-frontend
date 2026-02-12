import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from '../models/prescription';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionService {

  baseUrl = environment.baseUrl;

  private http = inject(HttpClient);

  getByClient(clientId: number): Observable<Prescription[]> {
    let url = `${this.baseUrl}/clients/${clientId}/prescriptions`;
    return this.http.get<Prescription[]>(url);
  }

  save(clientId: number, prescription: Prescription): Observable<void> {
    let url = `${this.baseUrl}/clients/${clientId}/prescriptions`;
    return this.http.post<void>(url, prescription);
  }

  delete(clientId: number, prescriptionId: number):Observable<void>{
      let url = `${this.baseUrl}/clients/${clientId}/prescriptions/${prescriptionId}`;
      return this.http.delete<void>(url);
    }
}
