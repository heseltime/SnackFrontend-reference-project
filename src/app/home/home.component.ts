import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, CommonModule, DOCUMENT } from '@angular/common';
import { ManageRestaurantService } from '../shared/manage-restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  testRestaurant:string = 'Burgerei';
  testApiKey:string = 'APIBurger123';

  // backend authentication response
  token: string = '';

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, public service: ManageRestaurantService) {}

  ngOnInit(): void {
    // Handle the authentication callback here since this component is guarded
    this.authenticateBackend()
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }

  authenticateBackend(): void {
    this.service.authenticateBackend(this.testRestaurant, this.testApiKey).subscribe({
        next: (response) => {
            this.token = response.token;
            console.log('Successfully authenticated to backend:', this.token);
        },
        error: (error) => {
            console.error('Error authenticating to backend:', error);
        }
    });
  }
}
