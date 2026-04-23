import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ProductPayload } from '../interfaces/product-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  getById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`/api/products/${id}`);
  };

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/products');
  };

  add(payload: ProductPayload): Observable<Product> {
    return this.httpClient.post<Product>('/api/products', payload);
  }

  update(id: string, payload: ProductPayload): Observable<Product> {
    return this.httpClient.put<Product>(`/api/products/${id}`, payload);
  }
}
