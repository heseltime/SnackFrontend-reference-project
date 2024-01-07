import { Component } from '@angular/core';
import { DiscoverUsers } from '../shared/discover-users.model';
import { DiscoverRestaurantsService } from '../shared/discover-restaurants.service';
import { DiscoverOrders } from '../shared/discover-orders.model';

@Component({
  selector: 'app-discover-restaurants',
  templateUrl: './discover-restaurants.component.html',
  styleUrls: ['./discover-restaurants.component.css']
})
export class DiscoverRestaurantsComponent {
  testStudent:DiscoverUsers = new DiscoverUsers(1, 'john_doe', '', ''); // example user, where id and name correspond to db however
                                       // used for order logic
  lastOrderId: string | null = null;

  constructor(public service: DiscoverRestaurantsService) { }

  ngOnInit() {
    this.lastOrderId = localStorage.getItem('lastOrderId');
  }
}
