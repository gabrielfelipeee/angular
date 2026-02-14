import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../models/entities/cliente';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_ROUTES_PATHS } from '../constants/APP_ROUTES';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { EstadoBrasilApi } from '../models/interfaces/estado-brasil-api';
import { BrasilApiService } from '../services/brasil-api.service';
import { MunicipioBrasilApi } from '../models/interfaces/municipio-brasil-api';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.html',
  imports: [
    NgxMaskDirective,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [
    provideNgxMask()
  ]
})
export class Cadastro implements OnInit {
  isCadastro: boolean = true;
  clienteId?: string;

  cliente: Cliente = Cliente.newCliente();

  estadosBrasil: EstadoBrasilApi[] = [];
  municipiosEstado: MunicipioBrasilApi[] = [];

  constructor(
    private clienteService: ClienteService,
    private brasilApiService: BrasilApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
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
    
    this.carregarEstadosBrasil();

    if (this.cliente.uf)
      this.carregarMunicipios(this.cliente.uf);
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

    this.exibirMensagem("Cliente adicionado com sucesso!");
  };

  atualizar(): void {
    this.clienteService.atualizar(this.cliente);
    this.router.navigate(APP_ROUTES_PATHS.CLIENTES.root());

    this.exibirMensagem("Cliente atualizado com sucesso!");
  };

  carregarEstadosBrasil() {
    //  Observable
    this.brasilApiService.listarEstados().subscribe({
      next: response => {
        this.estadosBrasil = response.sort((a, b) => a.nome.localeCompare(b.nome));

        if (!this.isCadastro)
          this.cliente.uf = this.cliente.uf;
      },
      error: error => {
        console.error(error);
        this.exibirMensagem("Erro ao carregar Estados!")
      }
    });
  };
  carregarMunicipios(uf: string) {
    if (!uf) return;

    this.brasilApiService.listarMunicipios(uf).subscribe({
      next: response => this.municipiosEstado = response.sort((a, b) => a.nome.localeCompare(b.nome)),
      error: error => {
        console.error(error);
        this.exibirMensagem("Erro ao carregar Munícipios!")
      }
    });
  };

  onSelectEstado(event: MatSelectChange) {
    const uf: string = event.value;
    if (!uf) return;

    this.carregarMunicipios(uf);
  };

  exibirMensagem(mensagem: string) {
    this.snackBar.open(mensagem, "Ok");
  };
}
