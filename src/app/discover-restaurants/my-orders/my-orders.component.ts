import { Component, Input } from '@angular/core';
import { DeliveryStatus, DiscoverOrders } from 'src/app/shared/discover-orders.model';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  @Input() lastOrderId: string | null = null;

  lastOrder: DiscoverOrders = new DiscoverOrders();

  constructor(public service: DiscoverRestaurantsService) { }

  ngOnInit() {
    this.lastOrderId = localStorage.getItem('lastOrderId');
    if (this.lastOrderId) {
      this.service.getOrderById(this.lastOrderId).subscribe({
        next: (data) => {
            this.lastOrder = data;
        },
        error: (error) => {
            console.error('Error fetching order:', error);
        }
    });
    }
  }

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
