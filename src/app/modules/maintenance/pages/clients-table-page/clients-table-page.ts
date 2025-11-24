import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../../../core/services/client';
import { Client } from '../../../../core/models/client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients-table-page',
  imports: [FormsModule],
  templateUrl: './clients-table-page.html',
  styleUrl: './clients-table-page.css',
})
export class ClientsTablePageComponent implements OnInit {

  private clientService = inject(ClientService);

  clients: Client[] = [];
  nameFilter: string = "";

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients(this.nameFilter).subscribe({
      next: clients => this.clients = clients
    });
  }

  filterByName(){
    this.loadClients();
  }

  delete(client: Client){
    this.clientService.delete(client).subscribe({
      next: () => {
        this.clients = this.clients.filter(c => c.id !== client.id)
      },
      error: () => {
        alert("Erro ao remover o cliente");
      }
    });
  }
}
