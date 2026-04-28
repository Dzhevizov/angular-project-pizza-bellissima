import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, map, catchError } from 'rxjs';
import { Product } from '../models/product.model';
import { products as staticProducts } from '../data/products';

const API_URL = 'http://localhost:3030/data/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(API_URL).pipe(
      map(items => items.map(item => ({ ...item, id: item._id }))),
      catchError(() => of([] as Product[])),
      map(dbProducts => {
        const dbById = new Map(dbProducts.map(p => [p.id, p]));
        const staticIds = new Set(staticProducts.map(p => p.id));

        // Static products overridden by DB version where available, always marked isStatic
        const merged = staticProducts.map(p => ({ ...(dbById.get(p.id) ?? p), isStatic: true }));
        // DB-only products (added by admin, not in static list)
        const dbOnly = dbProducts.filter(p => !staticIds.has(p.id));

        return [...merged, ...dbOnly];
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    const isStatic = staticProducts.some(p => p.id === id);
    return this.http.get<any>(`${API_URL}/${id}`).pipe(
      map(item => ({ ...item, id: item._id, isStatic })),
      catchError(() => {
        const staticProduct = staticProducts.find(p => p.id === id);
        if (staticProduct) return of({ ...staticProduct, isStatic: true });
        return throwError(() => new Error('Product not found'));
      })
    );
  }

  createProduct(product: Omit<Product, 'id' | '_id'>): Observable<Product> {
    return this.http
      .post<any>(API_URL, product)
      .pipe(map(item => ({ ...item, id: item._id })));
  }

  updateProduct(id: string, product: Partial<Omit<Product, 'id' | '_id'>>): Observable<Product> {
    return this.http
      .put<any>(`${API_URL}/${id}`, product)
      .pipe(map(item => ({ ...item, id: item._id })));
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
