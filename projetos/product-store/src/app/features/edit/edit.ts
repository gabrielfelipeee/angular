import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { Form } from '../../shared/form/form';
import { ProductPayload } from '../../shared/interfaces/product-payload.interface';

@Component({
  selector: 'app-edit',
  imports: [
    Form
  ],
  templateUrl: './edit.html'
})
export class Edit {
  private readonly productService = inject(ProductsService);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  onSubmit(product: ProductPayload) {
    this.productService.update(this.product.id, product).subscribe({
      next: () => {
        this.matSnackBar.open("Produto atualizado com sucesso!", "Ok");
        this.router.navigateByUrl('/');
      },
      error: () => this.matSnackBar.open("Erro ao cadastrar produto!", "Ok")
    });
  }
}
