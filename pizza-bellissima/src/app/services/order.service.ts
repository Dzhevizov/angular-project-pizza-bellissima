import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:3030';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  placeOrder(order: Omit<Order, 'id' | 'date' | 'clientId' | 'status'>): Observable<Order> {
    const body = {
      ...order,
      date: new Date().toISOString().split('T')[0],
      clientId: this.authService.currentUser?._id ?? '',
      status: 'PENDING' as const,
    };
    return this.http.post<any>(`${API_URL}/data/orders`, body).pipe(
      map(res => ({ ...res, id: res._id }))
    );
  }

  getMyOrders(): Observable<Order[]> {
    const clientId = this.authService.currentUser?._id ?? '';
    return this.http.get<any[]>(`${API_URL}/data/orders`).pipe(
      map(orders => orders
        .filter(o => o.clientId === clientId)
        .map(o => ({ ...o, id: o._id }))
      )
    );
  }

  getTodayOrders(): Observable<Order[]> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get<any[]>(`${API_URL}/data/orders`).pipe(
      map(orders => orders
        .filter(o => o.date === today)
        .map(o => ({ ...o, id: o._id }))
      )
    );
  }
}
