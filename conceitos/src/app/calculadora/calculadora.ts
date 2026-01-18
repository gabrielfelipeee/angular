import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  imports: [
    FormsModule
  ],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.scss'
})
export class Calculadora {
  num1: number = 0;
  num2: number = 0;
  result: number = 0;

  calcular() {
    this.result = this.num1 + this.num2;
  }
}
