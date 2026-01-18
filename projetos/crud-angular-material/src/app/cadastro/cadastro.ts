import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../models/entities/cliente';
import { ClienteService } from '../services/cliente.service';


@Component({
  selector: 'app-cadastro',
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './cadastro.html'
})
export class Cadastro {

  constructor(private _clienteService: ClienteService) { }


  cliente: Cliente = Cliente.newCliente();

  salvar(isInvalid: boolean) {
    if (isInvalid)
      return;

    this._clienteService.add(this.cliente);
  }
}
