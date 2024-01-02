import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscoverRestaurantsComponent } from './discover-restaurants/discover-restaurants.component';
import { FindRestaurantsComponent } from './discover-restaurants/find-restaurants/find-restaurants.component';
import { MyOrdersComponent } from './discover-restaurants/my-orders/my-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { RestaurantDetailComponent } from './discover-restaurants/find-restaurants/restaurant-detail/restaurant-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    DiscoverRestaurantsComponent,
    FindRestaurantsComponent,
    MyOrdersComponent,
    RestaurantDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
