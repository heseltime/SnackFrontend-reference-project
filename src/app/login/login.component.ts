import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, CommonModule, DOCUMENT } from '@angular/common';
import { ManageRestaurantService } from '../shared/manage-restaurant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  testRestaurant:string = 'Burgerei';

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, public service: ManageRestaurantService) {}

  ngOnInit(): void {
    // Handle the authentication callback to server in home component
  }

  login(): void {
    this.auth.loginWithRedirect({
      appState: { target: '/manage' }
    });
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }
}
