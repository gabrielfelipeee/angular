import { Component, signal } from '@angular/core';
import { ListaCompras } from "./lista-compras/lista-compras";
import { Calculadora } from "./calculadora/calculadora";

@Component({
  selector: 'app-root',
  imports: [ListaCompras, Calculadora],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('conceitos');
}
