import { Component } from '@angular/core';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';

@Component({
  selector: 'app-find-restaurants',
  templateUrl: './find-restaurants.component.html',
  styleUrls: ['./find-restaurants.component.css']
})
export class FindRestaurantsComponent {

  constructor(public service : DiscoverRestaurantsService) { }

  ngOnInit(): void {
    this.service.refreshList(); // pass in the radius, how to get from user? think two way binding and mat. design slider
  }
}
