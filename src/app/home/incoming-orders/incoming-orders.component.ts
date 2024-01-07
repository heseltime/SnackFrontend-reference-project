import { Component, Input } from '@angular/core';
import { DeliveryStatus, DiscoverOrders } from 'src/app/shared/discover-orders.model';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';
import { ManageRestaurantService } from 'src/app/shared/manage-restaurant.service';

@Component({
  selector: 'app-incoming-orders',
  templateUrl: './incoming-orders.component.html',
  styleUrls: ['./incoming-orders.component.css']
})
export class IncomingOrdersComponent {

  @Input() orders: DiscoverOrders[] = [];
  orderDetail: DiscoverOrders = new DiscoverOrders(); // detail view

  @Input() token: string = ''; // authentication token

  orderToUpdateStatusOn: DiscoverOrders = new DiscoverOrders(); 

  constructor(public service: DiscoverRestaurantsService, public managementService: ManageRestaurantService) { }

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

  getOrder(id: number): void {
    this.service.getOrderById(id.toString()).subscribe({
      next: (data) => {
          this.orderDetail = data;
          //console.log('Successfully fetched order:', this.orderDetail);
      },
      error: (error) => {
          console.error('Error fetching order:', error);
      }
    });
  }

  updateStatus(orderId: number, currentStatus: DeliveryStatus): void {
      //console.log('Switching status of order:', orderId);
      let newStatus = DeliveryStatus[currentStatus as unknown as keyof typeof DeliveryStatus] + 1;
      if (newStatus > 4) {
        newStatus = 4;
      }
      this.managementService.updateOrderStatus(this.token, orderId, newStatus).subscribe({
        next: (response) => {
            console.log('Successfully updated order in backend:', response);
            this.getOrders();
        },
        error: (error) => {
            console.error('Error updating order in backend:', error);
        }
    });
  }

  getOrders(): void {
    this.managementService.getOrders(this.token).subscribe({
        next: (response) => {
            //console.log('Successfully retrieved orders from backend:', response);
            // order orders descending by timestamp
            response.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1);
            this.orders = response;
        },
        error: (error) => {
            console.error('Error retrieving orders from backend:', error);
        }
    });
  }
}
