import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Client } from '../models/client';
import { Page } from '../models/page';
import { PaginationService } from './pagination';

@Injectable({
  providedIn: 'root',
})

export class ClientService {
  
  baseUrl = environment.baseUrl + "/clients";
  
  private http = inject(HttpClient);
  private paginationService = inject(PaginationService);

  getClientsPage(clientNameFilter:string, page: number):Observable<Page<Client>>{
    let url = `${this.baseUrl}?name_like=${clientNameFilter}&page=${this.paginationService.toBackend(page)}&limit=10&sort=name`
    return this.http.get<Page<Client>>(url);
  }
  
  getClientsByName(clientNameFilter: string):Observable<Page<Client>>{
    let url = `${this.baseUrl}?name_like=${clientNameFilter}&limit=10`;
    return this.http.get<Page<Client>>(url);
  }

  delete(client: Client):Observable<void>{
    console.log(client.id);
    let url = `${this.baseUrl}/${client.id}`;
    return this.http.delete<void>(url);
  }

  save(client: Client): Observable<void>{
    return this.http.post<void>(this.baseUrl, client);
  }

  getClientById(id: number):Observable<Client>{
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Client>(url);
  }

  update(client: Client): Observable<void>{
    let url = `${this.baseUrl}/${client.id}`;
    return this.http.put<void>(url,client);
  }
}
