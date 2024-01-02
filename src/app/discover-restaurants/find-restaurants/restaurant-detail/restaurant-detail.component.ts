import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css'],
})
export class RestaurantDetailComponent {
  constructor(private route: ActivatedRoute, private service: DiscoverRestaurantsService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    // this.book = this.bookStoreService.getBookById(params['id']);
    console.log(params['id']);
  }
}
