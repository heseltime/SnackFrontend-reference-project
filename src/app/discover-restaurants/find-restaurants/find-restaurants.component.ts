import { Component, Input } from '@angular/core';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';
import { DiscoverUsers } from 'src/app/shared/discover-users.model';

@Component({
  selector: 'app-find-restaurants',
  templateUrl: './find-restaurants.component.html',
  styleUrls: ['./find-restaurants.component.css']
})
export class FindRestaurantsComponent {
  @Input() user:DiscoverUsers = new DiscoverUsers(0, '', '', '', 0, 0);
  error = ''; // error message from geolocation

  sliderValue: number = 20;

  constructor(public service : DiscoverRestaurantsService) { }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.user.latitude = position.coords.latitude;
          this.user.longitude = position.coords.longitude;
          //console.log(this.user.latitude, this.user.longitude);
          this.service.refreshList(this.sliderValue, this.user.latitude, this.user.longitude);
        },
        (error) => {
          this.error = error.message;
        }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }

  ngOnInit(): void {
    this.getLocation(); 
    this.service.refreshListGlobal(); // pass in the radius, how to get from user? think two way binding and mat. design slider
  }

  onSliderChange(): void {
    this.service.refreshList(this.sliderValue, this.user.latitude, this.user.longitude);
  }
}
