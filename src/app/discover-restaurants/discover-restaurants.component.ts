import { Component } from '@angular/core';
import { DiscoverUsers } from '../shared/discover-users.model';

@Component({
  selector: 'app-discover-restaurants',
  templateUrl: './discover-restaurants.component.html',
  styleUrls: ['./discover-restaurants.component.css']
})
export class DiscoverRestaurantsComponent {
  user:DiscoverUsers = new DiscoverUsers(1, 'john_doe', '', ''); // example user, where id and name correspond to db however
                                       // used for order logic
}
