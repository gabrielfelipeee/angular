import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lugar } from './lugar';

@Injectable({
  providedIn: 'root',
})
export class LugarService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:3000/lugares';

  create(lugar: Lugar): Observable<Lugar> {
    return this.httpClient.post<Lugar>(this.baseUrl, lugar);
  };

  getAll(): Observable<Lugar[]> {
    return this.httpClient.get<Lugar[]>(this.baseUrl);
  };

};
