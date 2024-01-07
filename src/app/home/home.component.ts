import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, CommonModule, DOCUMENT } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

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
