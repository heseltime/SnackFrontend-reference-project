import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiscoverRestaurantsComponent } from './discover-restaurants/discover-restaurants.component';
import { FindRestaurantsComponent } from './discover-restaurants/find-restaurants/find-restaurants.component';
import { MyOrdersComponent } from './discover-restaurants/my-orders/my-orders.component';
import { RestaurantDetailComponent } from './discover-restaurants/find-restaurants/restaurant-detail/restaurant-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'restaurants',
    pathMatch: 'full'
  },
  {
    path: 'restaurants',
    component: DiscoverRestaurantsComponent
  },
  {
    path: 'restaurants/:id',
    component: RestaurantDetailComponent
  },
  {
    path: 'index.html',
    redirectTo: 'restaurants',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
