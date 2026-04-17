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

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/products');
  };

  add(payload: ProductPayload): Observable<Product> {
    return this.httpClient.post<Product>('/api/products', payload);
  }
}
