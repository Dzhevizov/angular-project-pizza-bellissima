import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';

const today = new Date().toISOString().split('T')[0];

const mockOrders: Order[] = [
  {
    id: 'ord-001',
    items: [
      { name: 'Пица Маргарита', quantity: 1, price: 6.08 },
      { name: 'Лимонова лимонада', quantity: 2, price: 2.51 },
    ],
    subtotal: 11.10,
    discounts: 0.91,
    deliveryFee: 0,
    total: 10.19,
    date: today,
    clientId: 'user-1',
    status: 'PENDING',
  },
  {
    id: 'ord-002',
    items: [
      { name: 'Паста Карбонара', quantity: 2, price: 6.39 },
      { name: 'Десерт Тирамису', quantity: 1, price: 3.68 },
    ],
    subtotal: 16.46,
    discounts: 1.28,
    deliveryFee: 0,
    total: 15.18,
    date: today,
    clientId: 'user-2',
    status: 'DELIVERED',
  },
  {
    id: 'ord-003',
    items: [
      { name: 'Ризото с гъби', quantity: 1, price: 7.11 },
    ],
    subtotal: 7.11,
    discounts: 1.42,
    deliveryFee: 2.55,
    total: 8.24,
    date: today,
    clientId: 'user-1',
    status: 'PENDING',
  },
];

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>(mockOrders);
  orders$ = this.ordersSubject.asObservable();

  placeOrder(order: Omit<Order, 'id' | 'date' | 'clientId' | 'status'>) {
    const newOrder: Order = {
      ...order,
      id: 'ord-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      clientId: 'user-1',
      status: 'PENDING',
    };
    this.ordersSubject.next([newOrder, ...this.ordersSubject.getValue()]);
  }

  getMyOrders(clientId: string): Order[] {
    return this.ordersSubject.getValue().filter((o) => o.clientId === clientId);
  }

  getTodayOrders(): Order[] {
    const today = new Date().toISOString().split('T')[0];
    return this.ordersSubject.getValue().filter((o) => o.date === today);
  }
}
