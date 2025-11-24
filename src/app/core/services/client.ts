import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  
  baseUrl = "http://localhost:3000/clients";

  private http = inject(HttpClient);

  getClients(clientNameFilter:string):Observable<Client[]>{
    let url = `${this.baseUrl}?name_like=${clientNameFilter}`
    return this.http.get<Client[]>(url);
  }

  delete(client: Client):Observable<void>{
    let url = `${this.baseUrl}/${client.id}`;
    return this.http.delete<void>(url);
  }
}
