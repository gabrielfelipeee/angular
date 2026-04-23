import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { Card } from "./components/card/card";
import { Router, RouterLink } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap, filter, tap } from 'rxjs';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';

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
  private readonly confirmationDialogService = inject(ConfirmationDialogService);
  private readonly matSnackBar = inject(MatSnackBar);

  private readonly router = inject(Router);

  products = signal<Product[]>([]);

  ngOnInit() {
    this.productService.getAll().subscribe(response => this.products.set(response));
  };

  onEdit(product: Product) {
    this.router.navigate(['/editar-produto', product.id]);
  };

  onDelete(product: Product) {

    this.confirmationDialogService.openDialog()
    
      // pipe: Método que cria um “pipeline” de operações.
      .pipe(

        // Só prossegue para a exclusão se a resposta for true.
        filter(response => Boolean(response)),

        // exhaustMap: para evitar requisições duplicadas
        // Se o usuário clicar várias vezes, ele ignora novas tentativas 
        // até que a exclusão atual termine, evitando requisições duplicadas.
        exhaustMap(() => this.productService.delete(product.id))
      )
      .subscribe({

        next: () => {
          this.matSnackBar.open("Produto excluído com sucesso!", "Ok");

          this.products.update(prev => prev.filter(p => p.id !== product.id));
        },
        error: () => this.matSnackBar.open("Erro ao excluir produto!", "Ok")
      });
  }
}
