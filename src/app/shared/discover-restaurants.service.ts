import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscoverRestaurantsService {

  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get('url')
  }
}
