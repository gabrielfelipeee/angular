import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lugar } from './lugar';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LugarService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = `${environment.apiUrl}/lugares`;

  create(lugar: Lugar): Observable<Lugar> {
    return this.httpClient.post<Lugar>(this.baseUrl, lugar);
  };

  getAll(): Observable<Lugar[]> {
    return this.httpClient.get<Lugar[]>(this.baseUrl);
  };

  filtrar(categoriaId: string | null, pesquisa: string | null): Observable<Lugar[]> {
    let params = new HttpParams();

    if (categoriaId)
      params = params.set('categoriaId_like', categoriaId);

    if (pesquisa)
      params = params.set('nome_like', pesquisa);

    return this.httpClient.get<Lugar[]>(this.baseUrl, { params });
  };

};
