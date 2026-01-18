import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardModule } from "@angular/material/card";
import { MatFormField, MatLabel, MatError, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/entities/cliente';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-consulta',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatError,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './consulta.html',
})
export class Consulta implements OnInit {
  listaClientes: Cliente[] = [];
  colunasTabelaClientes: string[] = ["id", "nome", "email", "cpf", "data_nascimento"];

  nomeBusca: string = "";
  constructor(private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.listaClientes = this.clienteService.filtrarClientes("");
  }

  pesquisar() {
    this.listaClientes = this.clienteService.filtrarClientes(this.nomeBusca);
  }
}
