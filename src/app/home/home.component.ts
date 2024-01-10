import { Component, Inject, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, CommonModule, DOCUMENT } from '@angular/common';
import { ManageRestaurantService } from '../shared/manage-restaurant.service';
import { DiscoverOrders } from '../shared/discover-orders.model';
import { DiscoverMenus } from '../shared/discover-menus.model';
import { DiscoverDeliveryConditions } from '../shared/discover-delivery-conditions.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  testRestaurant:string = 'Burgerei';
  testRestaurantId:number = 1;
  testApiKey:string = 'APIBurger123';

  // backend authentication response
  token: string = '';

  // backend requests
  @Output() orders: DiscoverOrders[] = [];

  menu: DiscoverMenus[] = [];
  deliveryConditions: DiscoverDeliveryConditions[] = [];

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, public service: ManageRestaurantService) {}

  ngOnInit(): void {
    // Handle the authentication callback here since this component is guarded
    this.authenticateBackend()
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }

  authenticateBackend(): void {
    this.service.authenticateBackend(this.testRestaurant, this.testApiKey).subscribe({
        next: (response) => {
            this.token = response.token;
            //console.log('Successfully authenticated to backend:', this.token);
            this.getOrders();
            this.getMenu(this.token);
            this.getDeliveryConditions(this.token);
        },
        error: (error) => {
            console.error('Error authenticating to backend:', error);
        }
    });
  }

  getOrders(): void {
    this.service.getOrders(this.token).subscribe({
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

  getMenu(token: string): void {
    this.service.getMenu(token).subscribe({
        next: (response) => {
            //console.log('Successfully retrieved menu from backend:', response);
            this.menu = this.sortMenu(response);

        },
        error: (error) => {
            console.error('Error retrieving menu from backend:', error);
        }
    });
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

  getDeliveryConditions(token: string): void {
    this.service.getDeliveryConditions(token).subscribe({
        next: (response) => {
            //console.log('Successfully retrieved delivery conditions from backend:', response);
            this.deliveryConditions = response;
            //console.log(this.deliveryConditions);
        },
        error: (error) => {
            console.error('Error retrieving delivery conditions from backend:', error);
        }
    });
  }
}
