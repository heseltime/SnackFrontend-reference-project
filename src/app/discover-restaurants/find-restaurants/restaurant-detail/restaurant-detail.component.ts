import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscoverRestaurants } from 'src/app/shared/discover-restaurants.model';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';
import { DiscoverOrderItems } from 'src/app/shared/discover-order-items.model';
import { DiscoverOrders } from 'src/app/shared/discover-orders.model';
import { DiscoverMenus } from 'src/app/shared/discover-menus.model';
import { DiscoverUsers } from 'src/app/shared/discover-users.model';
import { DiscoverAddresses } from 'src/app/shared/discover-addresses.model';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css'],
})
export class RestaurantDetailComponent {
  restaurant: DiscoverRestaurants | undefined = new DiscoverRestaurants();

  order:DiscoverOrders = new DiscoverOrders(); // order metadata like customer info
  orderItems:DiscoverOrderItems[] = []; // actual food items
                                    // add to order dynamically

  currentTotal: Number = 0;

  @Input() user: DiscoverUsers = new DiscoverUsers(0, '', '', ''); 
  
  constructor(private route: ActivatedRoute, public service: DiscoverRestaurantsService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.service.getRestaurantById(parseInt(params['id']));
    this.service.getMenuByRestaurantId(parseInt(params['id']));

    // Initialize order metadata
    this.order.restaurant = this.restaurant ?? new DiscoverRestaurants();
    this.order.restaurant.id = parseInt(params['id']);

    this.order.address = this.restaurant?.address ?? new DiscoverAddresses();
    this.order.orderedBy = this.user.id;
    this.order.timestamp = new Date();
    this.order.gpsLat = 0;
    this.order.gpsLong = 0;
    this.order.freeText = 'SNACKFrontend test order';
    this.order.status = 0; // Unknown 
  }

  addToOrder(menuItem: DiscoverMenus) {
    const foundOrderItem = this.orderItems.find(x => x.menu === menuItem);
    if (foundOrderItem) {
      foundOrderItem.quantity++;
    } else {
      this.orderItems.push(new DiscoverOrderItems(menuItem, 1));
      this.order.items = this.orderItems;
    }
  }

  removeFromOrder(menuItem: DiscoverMenus) {
    const foundOrderItem = this.orderItems.find(x => x.menu === menuItem);
    if (foundOrderItem) {
      foundOrderItem.quantity--;
      if (foundOrderItem.quantity === 0) {
        this.orderItems = this.orderItems.filter(x => x.menu !== menuItem);
        this.order.items = this.orderItems;
      }
    }
  }

  increaseOrderItem(orderItem: DiscoverOrderItems) {
    const foundOrderItem = this.orderItems.find(x => x.menu === orderItem.menu);
    if (foundOrderItem) {
      foundOrderItem.quantity++;
      this.order.items = this.orderItems;
    }
  }

  decreaseOrderItem(orderItem: DiscoverOrderItems) {
    const foundOrderItem = this.orderItems.find(x => x.menu === orderItem.menu);
    if (foundOrderItem) {
      foundOrderItem.quantity--;
      if (foundOrderItem.quantity === 0) {
        this.orderItems = this.orderItems.filter(x => x.menu !== orderItem.menu);
        this.order.items = this.orderItems;
      }
    }
  }

  lookupMenuItemName(orderItem: DiscoverOrderItems) {
    const foundMenuItemName = this.service.selectedMenu.find(x => x.id === orderItem.menu.id);
    if (foundMenuItemName) {
      return foundMenuItemName.itemName;
    }
    return ''; 
  }

  calculateTotal() {
    let total = 0;
    this.orderItems.forEach(orderItem => {
      const foundMenuItem = this.service.selectedMenu.find(x => x.id === orderItem.menu.id);
      if (foundMenuItem) {
        total += foundMenuItem.price * orderItem.quantity;
      }
    });
    return total + (this.service.selectedRestaurant?.deliveryCondition?.deliveryCost ?? 0);
  }
}
