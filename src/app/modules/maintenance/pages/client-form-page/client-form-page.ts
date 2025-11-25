import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../../../core/models/client';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientService } from '../../../../core/services/client';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-form-page',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './client-form-page.html',
  styleUrl: './client-form-page.css',
})
export class ClientFormPageComponent implements OnInit {

  clients: Client = {} as Client;

  isEditing: boolean = false;

  formBuilder = inject(FormBuilder);
  clientService = inject(ClientService);
  location = inject(Location);
  router = inject(ActivatedRoute);

  clientForm: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      let clientId = Number(params.get("id") ?? "0");
      if (clientId) {
        this.loadClient(clientId);
        this.isEditing = true;
      }
    })
  }

  loadClient(clientId: number) {
    this.clientService.getClientById(clientId).subscribe({
      next: client => this.clientForm.setValue(client),
      error: () => alert("Erro ao carregar um cliente")
    })
  }

  save() {
    if (this.clientForm.valid) {
      if (this.isEditing) {
        this.clientService.update(this.clientForm.value).subscribe(
          {
            next: () => {
              this.location.back();
            },
            error: () => alert("Erro ao salvar o cliente")
          }
        );
      }
      else {
        this.clientService.save(this.clientForm.value).subscribe(
          {
            next: () => {
              this.location.back();
            },
            error: () => alert("Erro ao salvar o cliente")
          }
        );
      }
    }
  }

  cancel() {
    this.location.back();
  }

  get cfName() { return this.clientForm.get("name") }
  get cfCpf() { return this.clientForm.get("cpf") }
  get cfPhone() { return this.clientForm.get("phone") }

}
