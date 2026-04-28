import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  private readonly EUR_TO_LEV = 1.95583;

  orders$!: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.orders$ = this.authService.isAdmin
      ? this.orderService.getTodayOrders()
      : this.orderService.getMyOrders();
  }

  toLev(eur: number): string {
    return (eur * this.EUR_TO_LEV).toFixed(2);
  }

  statusLabel(status: Order['status']): string {
    const labels: Record<Order['status'], string> = {
      PENDING: 'Изчакваща',
      DELIVERED: 'Доставена',
      CANCELLED: 'Отказана',
    };
    return labels[status];
  }
}
