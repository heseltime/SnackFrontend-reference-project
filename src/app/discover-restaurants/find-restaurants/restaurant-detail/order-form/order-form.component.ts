import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DiscoverAddresses } from 'src/app/shared/discover-addresses.model';
import { DeliveryStatus, DiscoverOrders } from 'src/app/shared/discover-orders.model';
import { DiscoverRestaurants } from 'src/app/shared/discover-restaurants.model';
import { FormBuilder } from '@angular/forms';
import { DiscoverRestaurantsService } from 'src/app/shared/discover-restaurants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  returnData: any = null;
  returnError: any = null;

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
  });

  constructor(
    public service : DiscoverRestaurantsService,
    private formBuilder: FormBuilder,
    private router: Router
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

  //onSubmit() {
  //  console.log(this.order);
  //  this.service.submitOrder(this.order).subscribe({
  //    next: (data) => this.returnData = data, 
  //    error: (error) => {
  //      //console.log(error);
  //      this.returnError = error;
  //    } 
  //  });
  //
    // pass to child component alert box
    // save order it to session/local (?) storage in case of success, to display on homepage
  //}

  onSubmit() {
    this.service.submitOrder(this.order).subscribe({
        next: (response) => {
            const orderId = response;
            this.returnData = orderId; // to signal to template that order was successful

            localStorage.setItem('lastOrderId', orderId); // For local storage
            // OR
            // sessionStorage.setItem('lastOrderId', orderId); // For session storage

            // Redirect to the homepage after a delay
            setTimeout(() => {
                this.router.navigate(['/']); // Replace '/' with your homepage route
            }, 1000); // Delay in milliseconds
        },
        error: (error) => {
            this.returnError = error;
            console.error('Error:', error);
            // Handle any errors here
        }
    });
}

  
  
}
