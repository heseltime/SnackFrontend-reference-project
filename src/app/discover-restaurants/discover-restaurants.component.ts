import { Component, OnInit } from '@angular/core';
import { DiscoverRestaurantsService } from '../shared/discover-restaurants.service';

@Component({
  selector: 'app-discover-restaurants',
  templateUrl: './discover-restaurants.component.html',
  styleUrls: ['./discover-restaurants.component.css']
})
export class DiscoverRestaurantsComponent {

  constructor(public service : DiscoverRestaurantsService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

}
