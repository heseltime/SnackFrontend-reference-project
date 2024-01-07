import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeDEAT from '@angular/common/locales/de-AT';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscoverRestaurantsComponent } from './discover-restaurants/discover-restaurants.component';
import { FindRestaurantsComponent } from './discover-restaurants/find-restaurants/find-restaurants.component';
import { MyOrdersComponent } from './discover-restaurants/my-orders/my-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantDetailComponent } from './discover-restaurants/find-restaurants/restaurant-detail/restaurant-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderFormComponent } from './discover-restaurants/find-restaurants/restaurant-detail/order-form/order-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';

registerLocaleData(localeDEAT);

@NgModule({
  declarations: [
    AppComponent,
    DiscoverRestaurantsComponent,
    FindRestaurantsComponent,
    MyOrdersComponent,
    RestaurantDetailComponent,
    PageNotFoundComponent,
    OrderFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-1yjs8ordjywgr6ly.us.auth0.com',
      clientId: '41burJXSnjlQzz25rYvbAsIuugrDaxFG',
      authorizationParams: {
        redirect_uri: window.location.origin + '/manage'
      }
    }),
  ],
  providers: [{
      provide: LOCALE_ID,
      useValue: 'de-AT'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
