import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { AvaliacaoEnum } from '../enums/avaliacao';
import { LugarService } from '../lugar.service';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss',
})
export class LugarComponent implements OnInit {
  private readonly categoriaService = inject(CategoriaService);
  private readonly lugarService = inject(LugarService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  lugarForm!: FormGroup;

  categorias: Categoria[] = [];

  avaliacoes = Object.entries(AvaliacaoEnum)
    .filter(([key]) => isNaN(Number(key)))
    .map(([label, value]) => ({
      label: this.formatAvaliacaoEnumLabel(label),
      value: value as AvaliacaoEnum
    }));

  ngOnInit(): void {
    this.lugarForm = new FormGroup({
      nome: new FormControl("", [Validators.required]),
      categoriaId: new FormControl("", [Validators.required]),
      localizacao: new FormControl("", [Validators.required]),
      urlImagem: new FormControl("", [Validators.required]),
      avaliacao: new FormControl(null, [Validators.required])
    });
    this.getCategorias();
  };

  isCampoInvalido(nomeCampo: string): boolean {
    if (!nomeCampo)
      return false;

    const control = this.lugarForm.get(nomeCampo);
    if (!control)
      return false;

    return control.invalid && control.touched;
  };

  salvarLugar() {
    if (this.lugarForm.invalid) {
      this.lugarForm.markAllAsTouched();;
      return;
    };

    this.lugarService.create(this.lugarForm.getRawValue())
      .subscribe({
        next: () => {
          this.lugarForm.reset();
        },
        error: error => console.error(error)
      });
  };

  getCategorias() {
    this.categoriaService.getAll().subscribe({
      next: response => {
        this.categorias = [...response];
        this.changeDetector.markForCheck();
      },
      error: error => console.error(error)
    })
  };

  private formatAvaliacaoEnumLabel(value: string): string {
    return value.replace(/([a-z])([A-Z])/g, '$1 $2');
  };
}
