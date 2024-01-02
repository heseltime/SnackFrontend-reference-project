import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscoverRestaurantsService {

  url:string = environment.apiBaseUrl+'/Restaurant/10000'; // stand-in radius

  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url)
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
