import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DiscoverRestaurants } from './discover-restaurants.model';
import { DiscoverMenus } from './discover-menus.model';

@Injectable({
  providedIn: 'root'
})
export class DiscoverRestaurantsService {

  restaurantUrl:string = environment.apiBaseUrl+'/Restaurant/10000'; // stand-in radius
  menuUrl:string = environment.apiBaseUrl+'/Menu/'; // stand-in radius

  restaurantList:DiscoverRestaurants[] = []; 
  selectedRestaurant:DiscoverRestaurants = new DiscoverRestaurants(); 

  selectedMenu:DiscoverMenus[] = []; 

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

  public lookupMenuItemName(menuId: number): string {
    const menuItem = this.selectedMenu.find(x => x.id === menuId);
    console.log(menuItem?.itemName);
    return menuItem ? menuItem.itemName : '';
  }
}
