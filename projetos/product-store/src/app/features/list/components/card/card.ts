import { Component, computed, input, output } from '@angular/core';
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
  edit = output<void>();
  delete = output<void>();

  productTitle = computed(() => this.product().title);

  onEdit = () => {
    this.edit.emit()
  };

  onDelete = () => {
    this.delete.emit()
  };
}
