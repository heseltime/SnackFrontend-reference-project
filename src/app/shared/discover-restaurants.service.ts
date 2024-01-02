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

  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url)
    .subscribe({
      next: data => {
        this.list = data as DiscoverRestaurants[];
        //console.log(this.list);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
