import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../models/entities/cliente';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_ROUTES_PATHS } from '../constants/APP_ROUTES';


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
export class Cadastro implements OnInit {
  isCadastro: boolean = true;
  clienteId?: string;

  cliente: Cliente = Cliente.newCliente();

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteId = this.route.snapshot.paramMap.get('clienteId') ?? undefined;
    if (this.clienteId) {

      const clienteToEditar = this.clienteService.buscarClientePorId(this.clienteId);
      if (!clienteToEditar) {
        this.router.navigate(APP_ROUTES_PATHS.CLIENTES.root());
        return;
      };

      this.isCadastro = false;
      this.cliente = clienteToEditar;
    };

  };

  salvarOrAtualizar(isInvalid: boolean) {
    if (isInvalid)
      return;

    if (this.isCadastro)
      this.adicionar()
    else
      this.atualizar()
  };

  adicionar(): void {
    this.clienteService.adicionar(this.cliente);
    this.cliente = Cliente.newCliente();
  };

  atualizar(): void {
    this.clienteService.atualizar(this.cliente);
    this.router.navigate(APP_ROUTES_PATHS.CLIENTES.root());
  };


}
