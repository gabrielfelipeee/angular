import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-component',
  standalone: false,
  templateUrl: './categoria.component.html',
})
export class CategoriaComponent implements OnInit {
  private readonly categoriaService = inject(CategoriaService);

  categoriaForm!: FormGroup;

  ngOnInit(): void {
    this.categoriaForm = new FormGroup({
      nome: new FormControl("", [Validators.required]),
      descricao: new FormControl("", [Validators.required, Validators.maxLength(500)])
    });
  };


  isCampoInvalido(nomeCampo: string): boolean {
    if (!nomeCampo)
      return false;

    const control = this.categoriaForm.get(nomeCampo);
    if (!control)
      return false;

    return control.invalid && control.touched;
  };

  salvarCategoria() {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();;
      return;
    };

    this.categoriaService.create(this.categoriaForm.getRawValue())
      .subscribe({
        next: () => {
          this.categoriaForm.reset();
        },
        error: error => console.error(error)
      });
  };

};
