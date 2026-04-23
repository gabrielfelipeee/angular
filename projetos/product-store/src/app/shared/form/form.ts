import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../interfaces/product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductPayload } from '../interfaces/product-payload.interface';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit {
  product = input<Product>();
  done = output<ProductPayload>();

  private readonly matSnackBar = inject(MatSnackBar);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.title ?? "", {
        nonNullable: true,
        validators: Validators.required
      })
    });
  }

  createForm() {
    this.form = new FormGroup({
      title: new FormControl<string>("", {
        nonNullable: true,
        validators: Validators.required
      })
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.matSnackBar.open("Formulário inválido!", "Ok");
      return;
    }

    const product = this.form.value as ProductPayload;
    this.done.emit(product);
  }
}
