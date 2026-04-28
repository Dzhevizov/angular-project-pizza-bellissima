import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  private readonly EUR_TO_LEV = 1.95583;

  constructor(
    private orderService: OrderService,
    public authService: AuthService
  ) {}

  orders$ = this.orderService.orders$.pipe(
    map(() =>
      this.authService.isAdmin
        ? this.orderService.getTodayOrders()
        : this.orderService.getMyOrders(this.authService.currentUser?._id ?? '')
    )
  );

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
