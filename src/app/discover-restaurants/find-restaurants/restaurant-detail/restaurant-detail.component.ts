import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscoverRestaurants } from 'src/app/shared/discover-restaurants.model';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';
import { DiscoverOrderItems } from 'src/app/shared/discover-order-items.model';
import { DiscoverOrders } from 'src/app/shared/discover-orders.model';
import { DiscoverMenus } from 'src/app/shared/discover-menus.model';
import { DiscoverUsers } from 'src/app/shared/discover-users.model';
import { DiscoverAddresses } from 'src/app/shared/discover-addresses.model';
import { DiscoverDeliveryConditions } from 'src/app/shared/discover-delivery-conditions.model';

// haeavy use of observables (retooling) in this component
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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

  testStudent:DiscoverUsers = new DiscoverUsers(1, 'john_doe', '', ''); // example user, where id and name correspond to db however
                                                     // used for order logic
  user: DiscoverUsers = this.testStudent; // following home.component.ts
  
  constructor(private route: ActivatedRoute, public service: DiscoverRestaurantsService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;

    this.service.getRestaurantById(parseInt(params['id']));
    this.service.getMenuByRestaurantId(parseInt(params['id']));

    // Initialize order metadata
    this.order.restaurant = this.restaurant ?? new DiscoverRestaurants();
    this.order.restaurant.id = parseInt(params['id']);

    //this.order.address = this.restaurant?.address ?? new DiscoverAddresses();
    //this.order.orderedBy = this.user.id;

    this.order.timestamp = new Date();

    this.getLocation().subscribe(
      coords => {
        this.user.latitude = coords.latitude;
        this.user.longitude = coords.longitude;
        this.order.gpsLat = coords.latitude;
        this.order.gpsLong = coords.longitude;
      },
      error => console.log(error.message)
    );

    this.order.freeText = 'SNACKFrontend test order';
    this.order.status = 0; // Unknown 
  }

  // observable version - compare to discover-restaurants.component.ts
  getLocation(): Observable<GeolocationCoordinates> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            observer.next(position.coords);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      } else {
        observer.error(new Error('Geolocation is not supported by this browser.'));
      }
    });
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

  checkOrderIsPossible(deliveryCondition: DiscoverDeliveryConditions) { // in terms of distance
    if (deliveryCondition) {
      if (this.restaurant && this.user) {
        console.log(this.restaurant.gpsLat, this.restaurant.gpsLong, this.user.latitude, this.user.longitude);
        return deliveryCondition.distance >= this.getLocationDistance(this.restaurant.gpsLat, this.restaurant.gpsLong, this.user.latitude, this.user.longitude);
      }
    }
    return false;
  }

  getLocationDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
      const toRad = (value: number): number => {
          return value * Math.PI / 180;
      };

      const earthRadius = 6371; // Radius of the earth in kilometers
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a = 
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c; // Distance in kilometers

      return distance;
  }
}
