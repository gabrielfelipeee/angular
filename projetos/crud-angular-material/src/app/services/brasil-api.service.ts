import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoBrasilApi } from '../models/interfaces/estado-brasil-api';
import { MunicipioBrasilApi } from '../models/interfaces/municipio-brasil-api';

@Injectable({
  providedIn: 'root',
})
export class BrasilApiService {
  private readonly baseUrl: string = 'https://brasilapi.com.br/api';

  constructor(private http: HttpClient) { }

  listarEstados(): Observable<EstadoBrasilApi[]> {
    return this.http.get<EstadoBrasilApi[]>(`${this.baseUrl}/ibge/uf/v1`);
  };

  listarMunicipios(uf: string): Observable<MunicipioBrasilApi[]> {
    return this.http.get<MunicipioBrasilApi[]>(`${this.baseUrl}/ibge/municipios/v1/${uf}`);
  };
}
