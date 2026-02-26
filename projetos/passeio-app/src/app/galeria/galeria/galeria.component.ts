import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../../lugares/lugar.service';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss',
})
export class GaleriaComponent implements OnInit {
  private readonly categoriaService = inject(CategoriaService);
  private readonly lugarService = inject(LugarService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  formFiltro!: FormGroup<{
    pesquisa: FormControl<string | null>
    categoriaId: FormControl<string | null>
  }>;

  allLugares: Lugar[] = [];
  lugaresFiltrados: Lugar[] = [];

  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.getLugares();
    this.getCategorias();

    this.formFiltro = new FormGroup({
      pesquisa: new FormControl(""),
      categoriaId: new FormControl("")
    });

    this.formFiltro.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(formValue => this.filtrarLugares(formValue.categoriaId ?? null, formValue.pesquisa ?? null));
  };

  getNomeCategoria(lugar: Lugar): string {
    const semCategoria = "Sem Categoria";

    if (!lugar?.categoriaId)
      return semCategoria;

    return this.categorias.find(categoria => categoria.id === lugar.categoriaId)?.nome || semCategoria;
  };

  gerarEstrelas(avaliacao: number): string {
    const notaMaxima = 5;

    let nota = Number(avaliacao);
    if (isNaN(nota) || nota < 0)
      nota = 0;

    nota = Math.floor(nota); // Garante que seja inteiro

    if (nota > notaMaxima)
      nota = notaMaxima;

    let estrelasCheias = "&starf;".repeat(nota);
    let estrelasVazias = "&star;".repeat(notaMaxima - nota);

    return estrelasCheias + estrelasVazias;
  };

  filtrarLugares(categoriaId: string | null, pesquisa: string | null) {
    this.lugarService.filtrar(categoriaId, pesquisa).subscribe({
      next: response => {
        this.lugaresFiltrados = response;
        this.changeDetector.markForCheck();
      },
      error: error => console.error(error)
    })
  };

  getLugares() {
    this.lugarService.getAll().subscribe({
      next: response => {
        this.allLugares = response;
        this.lugaresFiltrados = response;
        this.changeDetector.markForCheck();
      },
      error: error => console.error(error)
    })
  };

  getCategorias() {
    this.categoriaService.getAll().subscribe({
      next: response => {
        this.categorias = response;
        this.changeDetector.markForCheck();
      },
      error: error => console.error(error)
    })
  };
}
