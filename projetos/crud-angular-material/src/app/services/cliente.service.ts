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

  adicionar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage))
  };
  atualizar(cliente: Cliente) {
    const storage = this.obterStorage();

    const index = storage.findIndex(cli => cli.id === cliente.id);
    if (index === -1) return;
    storage[index] = { ...storage[index], ...cliente };

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage))
  };

  excluir(clienteId: string): boolean {
    const storage = this.obterStorage();

    const novoStorage = storage.filter(cli => cli.id !== clienteId);

    if (novoStorage.length === storage.length)
      return false;

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novoStorage));
    return true;
  };


  buscarClientePorId(clientId: string): Cliente | undefined {
    return this.obterStorage().find(cliente => cliente.id === clientId);
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
  };
};
