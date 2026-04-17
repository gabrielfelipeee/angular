import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from "@angular/material/button";
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.html',
  styleUrl: './create.scss',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAnchor
  ]
})
export class Create {
  private readonly productService = inject(ProductsService);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  form = new FormGroup({
    title: new FormControl<string>("", {
      nonNullable: true,
      validators: Validators.required
    })
  });

  onSubmit() {
    if (this.form.invalid) {
      this.matSnackBar.open("Formulário inválido!", "Ok");
      return;
    }


    this.productService.add({ title: this.form.controls.title.value }).subscribe({
      next: () => {
        this.matSnackBar.open("Produto cadastrado com sucesso!", "Ok");
        this.router.navigateByUrl('/');
      },
      error: () => this.matSnackBar.open("Erro ao cadastrar produto!", "Ok")
    });

  }
}
