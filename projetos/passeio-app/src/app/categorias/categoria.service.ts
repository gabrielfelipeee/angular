import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:3000/categorias';

  create(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.post<Categoria>(this.baseUrl, categoria);
  };

  getAll(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.baseUrl);
  };

};
