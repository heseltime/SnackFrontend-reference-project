import { Component, Input } from '@angular/core';
import { DeliveryStatus, DiscoverOrders } from 'src/app/shared/discover-orders.model';

@Component({
  selector: 'app-incoming-orders',
  templateUrl: './incoming-orders.component.html',
  styleUrls: ['./incoming-orders.component.css']
})
export class IncomingOrdersComponent {

  @Input() orders: DiscoverOrders[] = [];

  constructor() { }

  getStatusClass(status: DeliveryStatus): string {
    switch (status) {
        case DeliveryStatus.OrderPlaced:
            return 'text-success'; // Green text for Order Placed
        case DeliveryStatus.InTheKitchen:
            return 'text-warning'; // Yellow text for In The Kitchen
        case DeliveryStatus.OnTheWay:
            return 'text-primary'; // Dark blue text for On The Way
        case DeliveryStatus.Delivered:
            return 'text-info'; // Gray text for Delivered
        case DeliveryStatus.Unknown:
        default:
            return 'text-muted'; // Grey text for Unknown or default
    }
}

}