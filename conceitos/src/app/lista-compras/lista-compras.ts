import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Produto } from '../models/Produto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-lista-compras',
  imports: [FormsModule, NgClass],
  templateUrl: './lista-compras.html',
  styleUrl: './lista-compras.scss'
})
export class ListaCompras {
  listaCompras: Produto[] = [];
  item?: string;

  adicionar() {
    let produto = new Produto();
    produto.id = this.listaCompras.length + 1;
    produto.name = this.item;

    this.listaCompras.push(produto);
  }

  riscarProduto(produto: Produto) {
    produto.comprado = !produto.comprado;

    console.table(this.listaCompras);
  }
}