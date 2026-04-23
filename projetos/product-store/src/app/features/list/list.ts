import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { Card } from "./components/card/card";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  imports: [
    MatButtonModule,
    Card,
    RouterLink
  ]
})
export class List implements OnInit {
  private readonly productService = inject(ProductsService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  products: Product[] = [];

  ngOnInit() {
    this.productService.getAll().subscribe(response => {
      this.products = response;
      this.changeDetector.detectChanges();
    });
  };

  onEdit(product: Product) {
    this.router.navigate(['/editar-produto', product.id]);
  };
}
