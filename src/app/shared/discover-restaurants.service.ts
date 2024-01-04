import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DiscoverRestaurants } from './discover-restaurants.model';
import { DiscoverMenus } from './discover-menus.model';
import { DiscoverDeliveryConditions } from './discover-delivery-conditions.model';
import { DiscoverOrders } from './discover-orders.model';

@Injectable({
  providedIn: 'root'
})
export class DiscoverRestaurantsService {

  restaurantUrl:string = environment.apiBaseUrl+'/Restaurant/10000'; // stand-in radius
  menuUrl:string = environment.apiBaseUrl+'/Menu/'; // stand-in radius
  deliveryConditionUrl:string = environment.apiBaseUrl+'/DeliveryCondition/'; // !!
  orderUrl:string = environment.apiBaseUrl+'/Order'; 

  restaurantList:DiscoverRestaurants[] = []; 
  selectedRestaurant:DiscoverRestaurants = new DiscoverRestaurants(); 

  selectedMenu:DiscoverMenus[] = []; 

  deliveryCondition:DiscoverDeliveryConditions = new DiscoverDeliveryConditions(); // !!

  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.restaurantUrl)
    .subscribe({
      next: data => {
        this.restaurantList = data as DiscoverRestaurants[];
      },
      error: error => {
        console.log(error);
      }
    })
  }

  getRestaurantById(id: number) {
    if (this.restaurantList.length === 0) {
      this.http.get(this.restaurantUrl)
      .subscribe({
        next: data => {
          this.restaurantList = data as DiscoverRestaurants[];
          this.selectedRestaurant = this.restaurantList.find(x => x.id === id) as DiscoverRestaurants;
        },
        error: error => {
          console.log(error);
        }
      })
    }
    
    this.selectedRestaurant = this.restaurantList.find(x => x.id === id) as DiscoverRestaurants;
  }

  getMenuByRestaurantId(id: number) {
    this.http.get(this.menuUrl + id)
    .subscribe({
      next: data => {
        this.selectedMenu = data as DiscoverMenus[];
        this.selectedMenu = this.sortMenu(this.selectedMenu);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  private sortMenu(menuItems: DiscoverMenus[]): DiscoverMenus[] {
    const sortOrder: { [key: string]: number } = {
      'Starters': 1,
      'Main Course': 2,
      'Dessert': 3
    };

    return menuItems.sort((a, b) => {
      return (sortOrder[a.category] || 999) - (sortOrder[b.category] || 999);
    });
  }

  getDeliveryConditionByRestaurantId(id: number) {
    this.http.get(this.deliveryConditionUrl + id)
    .subscribe({
      next: data => {
        this.deliveryCondition = data as DiscoverDeliveryConditions;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  submitOrder(order: DiscoverOrders) {
    this.http.post(this.orderUrl, order)
    .subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
