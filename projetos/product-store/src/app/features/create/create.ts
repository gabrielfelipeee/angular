import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { Form } from '../../shared/form/form';
import { ProductPayload } from '../../shared/interfaces/product-payload.interface';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-create',
  templateUrl: './create.html',
  imports: [
    Form,
    RouterLink,
    MatIcon,
    MatButtonModule
]
})
export class Create {
  private readonly productService = inject(ProductsService);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly router = inject(Router);


  onSubmit(product: ProductPayload) {
    this.productService.add(product).subscribe({
      next: () => {
        this.matSnackBar.open("Produto cadastrado com sucesso!", "Ok");
        this.router.navigateByUrl('/');
      },
      error: () => this.matSnackBar.open("Erro ao cadastrar produto!", "Ok")
    });
  }
}
