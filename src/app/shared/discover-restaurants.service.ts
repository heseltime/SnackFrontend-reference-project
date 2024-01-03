import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DiscoverRestaurants } from './discover-restaurants.model';

@Injectable({
  providedIn: 'root'
})
export class DiscoverRestaurantsService {

  url:string = environment.apiBaseUrl+'/Restaurant/10000'; // stand-in radius
  list:DiscoverRestaurants[] = []; 
  selectedRestaurant:DiscoverRestaurants = new DiscoverRestaurants(); 

  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url)
    .subscribe({
      next: data => {
        this.list = data as DiscoverRestaurants[];
        console.log(this.list);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  getRestaurantById(id: number) {
    if (this.list.length === 0) {
      this.http.get(this.url)
      .subscribe({
        next: data => {
          this.list = data as DiscoverRestaurants[];
          //console.log(this.list.find(x => x.id === id));
          //return this.list.find(x => x.id === id);
          this.selectedRestaurant = this.list.find(x => x.id === id) as DiscoverRestaurants;
        },
        error: error => {
          console.log(error);
        }
      })
    }
    
    //return this.list.find(x => x.id === id);
    this.selectedRestaurant = this.list.find(x => x.id === id) as DiscoverRestaurants;
  }
}
