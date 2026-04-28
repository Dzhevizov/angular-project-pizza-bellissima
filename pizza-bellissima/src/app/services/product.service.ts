import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

const API_URL = 'http://localhost:3030/data/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(API_URL).pipe(
      map((items) => items.map((item) => ({ ...item, id: item._id })))
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http
      .get<any>(`${API_URL}/${id}`)
      .pipe(map((item) => ({ ...item, id: item._id })));
  }

  createProduct(product: Omit<Product, 'id' | '_id'>): Observable<Product> {
    return this.http
      .post<any>(API_URL, product)
      .pipe(map((item) => ({ ...item, id: item._id })));
  }

  updateProduct(id: string, product: Partial<Omit<Product, 'id' | '_id'>>): Observable<Product> {
    return this.http
      .put<any>(`${API_URL}/${id}`, product)
      .pipe(map((item) => ({ ...item, id: item._id })));
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
