import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DiscoverAddresses } from 'src/app/shared/discover-addresses.model';
import { DeliveryStatus, DiscoverOrders } from 'src/app/shared/discover-orders.model';
import { DiscoverRestaurants } from 'src/app/shared/discover-restaurants.model';
import { FormBuilder } from '@angular/forms';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {

  @Input() order: DiscoverOrders = {
    restaurant: new DiscoverRestaurants(),
    address: new DiscoverAddresses(),
    orderedBy: 0,
    timestamp: new Date(),
    gpsLat: 0,
    gpsLong: 0,
    freeText: '',
    status: DeliveryStatus.OrderPlaced,
    items: []
  };

  orderForm = this.formBuilder.group({
    name: '',
    address: ''
  });

  constructor(
    public service : DiscoverRestaurantsService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']) {
      this.repopulateForm();
    }
    // order object itself already up to date from parent component
  }

  private repopulateForm(): void {
    // In case of any additional input data
  }

  onSubmit(): void {
    //console.log(this.orderForm.value); 
    console.log(this.order);
    this.service.submitOrder(this.order); // get order id for local storage?
  }
}
