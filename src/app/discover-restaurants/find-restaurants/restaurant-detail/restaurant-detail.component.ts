import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscoverRestaurants } from 'src/app/shared/discover-restaurants.model';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css'],
})
export class RestaurantDetailComponent {
  restaurant: DiscoverRestaurants | undefined = new DiscoverRestaurants();

  constructor(private route: ActivatedRoute, private service: DiscoverRestaurantsService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    //console.log(params['id']);
    this.restaurant = this.service.getRestaurantById(parseInt(params['id']));
    //console.log(this.restaurant);
  }
}
