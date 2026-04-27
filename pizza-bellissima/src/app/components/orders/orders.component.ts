import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
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

  // Swap to true to preview admin view
  isAdmin = true;

  orders$ = this.orderService.orders$.pipe(
    map((orders) =>
      this.isAdmin
        ? this.orderService.getTodayOrders()
        : this.orderService.getMyOrders('user-1')
    )
  );

  constructor(private orderService: OrderService) {}

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
