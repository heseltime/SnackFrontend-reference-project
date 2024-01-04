import { Component, Input } from '@angular/core';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';
import { DiscoverUsers } from 'src/app/shared/discover-users.model';

@Component({
  selector: 'app-find-restaurants',
  templateUrl: './find-restaurants.component.html',
  styleUrls: ['./find-restaurants.component.css']
})
export class FindRestaurantsComponent {
  @Input() user:DiscoverUsers = new DiscoverUsers(0, '', '', '');

  constructor(public service : DiscoverRestaurantsService) { }

  ngOnInit(): void {
    this.service.refreshList(); // pass in the radius, how to get from user? think two way binding and mat. design slider
  }
}
