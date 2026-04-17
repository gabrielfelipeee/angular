import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
})
export class Card {
  product = input.required<Product>();

  productTitle = computed(() => this.product().title);
}
