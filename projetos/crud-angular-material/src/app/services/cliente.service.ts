import { Injectable } from '@angular/core';
import { Cliente } from '../models/entities/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static REPO_CLIENTES = "_CLIENTES";

  private obterStorage(): Cliente[] {
    const repClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (repClientes) {
      const clientes: Cliente[] = JSON.parse(repClientes); // Transforma string em JSON
      return clientes;
    };

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes)); // Transforma JSON em string
    return clientes;
  };

  add(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage))
  };

  filtrarClientes(nomeBusca: string): Cliente[] {
    const allClientes: Cliente[] = this.obterStorage();

    if (!nomeBusca)
      return allClientes;

    // Retorna a posição (índice) onde o texto começa.
    // Ex:
    // "Maria".indexOf("ri") // 2 -> ri comeca no índice 2
    // "Maria".indexOf("Jo") // -1 -> Retorna -1 se não encontrar 
    const clientesFiltrados: Cliente[] = allClientes.filter(cliente => cliente.nome?.toLowerCase().indexOf(nomeBusca.toLowerCase()) !== -1);
    return clientesFiltrados;
  }
};
