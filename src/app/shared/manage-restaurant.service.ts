import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DiscoverRestaurants } from './discover-restaurants.model';
import { DiscoverMenus } from './discover-menus.model';
import { DiscoverDeliveryConditions } from './discover-delivery-conditions.model';
import { DiscoverOrders } from './discover-orders.model';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageRestaurantService {
  apiTokenUrl:string = environment.apiBaseUrl+'/auth/login'; // also provided in home.component.ts

  ordersUrl:string = environment.apiBaseUrl+'/Business/orders';
  orderStatusUpdateUrl:string = environment.apiBaseUrl+'/Business/orderStatusUpdate';

  menuUrl:string = environment.apiBaseUrl+'/Business/menu';
  deliveryConditionsUrl:string = environment.apiBaseUrl+'/Business/conditions';

  constructor(private http: HttpClient, private router: Router) { }

  authenticateBackend(restaurantName: string, apiKey: string): Observable<any> {
    let authenticationInfo = {
      "RestaurantName": restaurantName,
      "ApiKey": apiKey
    };
    return this.http.post(this.apiTokenUrl, authenticationInfo);
  }

  getOrders(token: string): Observable<DiscoverOrders[]> {
    return this.http.get<DiscoverOrders[]>(this.ordersUrl, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  updateOrderStatus(token: string, orderId: number, newStatus: number): Observable<any> {
    return this.http.post(this.orderStatusUpdateUrl + '/' + orderId, newStatus, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  /* menus */

  getMenu(token: string): Observable<DiscoverMenus[]> {
    return this.http.get<DiscoverMenus[]>(this.menuUrl, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  removeFromMenu(token: string, menuItem: DiscoverMenus): Observable<any> {
    return this.http.delete(this.menuUrl + '/' + menuItem.id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  addToMenu(token: string, menuItem: DiscoverMenus): Observable<any> {
    return this.http.post(this.deliveryConditionsUrl, menuItem, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }


  /* delivery conditions */

  getDeliveryConditions(token: string): Observable<DiscoverDeliveryConditions[]> {
    return this.http.get<DiscoverDeliveryConditions[]>(this.deliveryConditionsUrl, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  removeDeliveryCondition(token: string, condition: DiscoverDeliveryConditions): Observable<any> {
    return this.http.delete(this.deliveryConditionsUrl + '/' + condition.id, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  addDeliveryCondition(token: string, condition: DiscoverDeliveryConditions): Observable<any> {
    return this.http.post(this.deliveryConditionsUrl, condition, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

}
