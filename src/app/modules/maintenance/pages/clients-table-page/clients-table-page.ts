import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../../../core/services/client';
import { Client } from '../../../../core/models/client';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../../../core/models/page';
import { RouterLink } from "@angular/router";
import { ToastService } from '../../../../core/services/toast';

@Component({
  selector: 'app-clients-table-page',
  imports: [FormsModule, NgbPaginationModule, RouterLink],
  templateUrl: './clients-table-page.html',
  styleUrl: './clients-table-page.css',
})
export class ClientsTablePageComponent implements OnInit {

  clientService = inject(ClientService);
  toastService = inject(ToastService);

  clientPage: Page<Client> = {} as Page<Client>;
  page = 1;

  nameFilter: string = "";

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients(this.nameFilter, this.page).subscribe({
      next: response => {
        this.clientPage.content = response.body;
        this.clientPage.numberOfElements = parseInt(response.headers.get("X-Total-Count") || "0");
      }
    });
  }

  pageChange(){
    this.loadClients();    
  }

  filterByName(){
    this.loadClients();
  }

  delete(client: Client){
    this.clientService.delete(client).subscribe({
      next: () => {
        this.toastService.show("Cliente removido com sucesso!", "bg-success text-light");
        this.loadClients();
      },
      error: () => {
        this.toastService.show('Houve um erro ao remover o cliente!', 'bg-danger text-light')
      }
    });
  }
}
