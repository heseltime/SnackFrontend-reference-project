import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscoverRestaurantsComponent } from './discover-restaurants/discover-restaurants.component';
import { FindRestaurantsComponent } from './discover-restaurants/find-restaurants/find-restaurants.component';
import { MyOrdersComponent } from './discover-restaurants/my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    DiscoverRestaurantsComponent,
    FindRestaurantsComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
