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

}
