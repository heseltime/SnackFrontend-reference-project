import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscoverRestaurants } from 'src/app/shared/discover-restaurants.model';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';
import { DiscoverOrderItems } from 'src/app/shared/discover-order-items.model';
import { DiscoverOrders } from 'src/app/shared/discover-orders.model';
import { DiscoverMenus } from 'src/app/shared/discover-menus.model';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css'],
})
export class RestaurantDetailComponent {
  restaurant: DiscoverRestaurants | undefined = new DiscoverRestaurants();

  order:DiscoverOrders = new DiscoverOrders(); // order metadata like customer info
  orderItems:DiscoverOrderItems[] = []; // actual food items
                                    // all of this has to be sent to server

  currentTotal:Number = 0;

  constructor(private route: ActivatedRoute, public service: DiscoverRestaurantsService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.service.getRestaurantById(parseInt(params['id']));
    this.service.getMenuByRestaurantId(parseInt(params['id']));
  }

  addToOrder(menuItem: DiscoverMenus) {
    const foundOrderItem = this.orderItems.find(x => x.menuId === menuItem.id);
    if (foundOrderItem) {
      foundOrderItem.quantity++;
    } else {
      this.orderItems.push(new DiscoverOrderItems(this.order.id, menuItem.id, 1));
    }
  }

  removeFromOrder(menuItem: DiscoverMenus) {
    const foundOrderItem = this.orderItems.find(x => x.menuId === menuItem.id);
    if (foundOrderItem) {
      foundOrderItem.quantity--;
      if (foundOrderItem.quantity === 0) {
        this.orderItems = this.orderItems.filter(x => x.menuId !== menuItem.id);
      }
    }
  }

  increaseOrderItem(orderItem: DiscoverOrderItems) {
    const foundOrderItem = this.orderItems.find(x => x.menuId === orderItem.menuId);
    if (foundOrderItem) {
      foundOrderItem.quantity++;
    }
  }

  decreaseOrderItem(orderItem: DiscoverOrderItems) {
    const foundOrderItem = this.orderItems.find(x => x.menuId === orderItem.menuId);
    if (foundOrderItem) {
      foundOrderItem.quantity--;
      if (foundOrderItem.quantity === 0) {
        this.orderItems = this.orderItems.filter(x => x.menuId !== orderItem.menuId);
      }
    }
  }

  lookupMenuItemName(orderItem: DiscoverOrderItems) {
    const foundMenuItemName = this.service.selectedMenu.find(x => x.id === orderItem.menuId);
    if (foundMenuItemName) {
      return foundMenuItemName.itemName;
    }
    return ''; 
  }

  calculateTotal() {
    let total = 0;
    this.orderItems.forEach(orderItem => {
      const foundMenuItem = this.service.selectedMenu.find(x => x.id === orderItem.menuId);
      if (foundMenuItem) {
        total += foundMenuItem.price * orderItem.quantity;
      }
    });
    return total + (this.service.selectedRestaurant?.deliveryCondition?.deliveryCost ?? 0);
  }
}
