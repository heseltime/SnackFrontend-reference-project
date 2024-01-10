import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DiscoverDeliveryConditions } from 'src/app/shared/discover-delivery-conditions.model';
import { DiscoverMenus } from 'src/app/shared/discover-menus.model';
import { ManageRestaurantService } from 'src/app/shared/manage-restaurant.service';

@Component({
  selector: 'app-my-restaurant',
  templateUrl: './my-restaurant.component.html',
  styleUrls: ['./my-restaurant.component.css']
})
export class MyRestaurantComponent implements OnChanges, OnInit {

  ngOnChanges(changes: SimpleChanges) {
    if (changes['deliverConditions']) {
      this.deliveryConditions = changes['deliveryConditions'].currentValue;
      console.log('deliveryConditions changed:', this.deliveryConditions);
    }
  }

  ngOnInit(): void {
    //console.log(this.token);
    //console.log(this.menu);
    //console.log(this.deliveryConditions);
  }

  @Input() menu: DiscoverMenus[] = [];

  @Input() deliveryConditions: DiscoverDeliveryConditions[] = [];

  constructor(public managementService: ManageRestaurantService) { }

  @Input() token: string = ''; // authentication token

  @Input() restaurantId: number = 0;

  returnErrorMenuItem: any = null;
  returnErrorDeliveryCondition: any = null;


  getMenu(token: string): void {
    this.managementService.getMenu(token).subscribe({
        next: (response) => {
            //console.log('Successfully retrieved menu from backend:', response);
            this.menu = this.sortMenu(response);

        },
        error: (error) => {
            console.error('Error retrieving menu from backend:', error);
        }
    });
  }

  private sortMenu(menuItems: DiscoverMenus[]): DiscoverMenus[] {
    const sortOrder: { [key: string]: number } = {
      'Starters': 1,
      'Main Course': 2,
      'Dessert': 3
    };

    return menuItems.sort((a, b) => {
      return (sortOrder[a.category] || 999) - (sortOrder[b.category] || 999);
    });
  }

  removeFromMenu(menuItem: DiscoverMenus): void {
    //console.log('Removing menu item:', menuItem);
    this.managementService.removeFromMenu(this.token, menuItem).subscribe({
      next: (response) => {
          //console.log('Successfully removed menu item from backend:', response);
          this.getMenu(this.token);
      },
      error: (error) => {
          //console.error('Error removing menu item from backend:', error);
          this.returnErrorMenuItem = error;
      }
    });
  }

  addToMenu(menuItem: DiscoverMenus): void {
    //console.log('Adding menu item:', menuItem);
    this.managementService.addToMenu(this.token, menuItem).subscribe({
      next: (response) => {
          //console.log('Successfully added menu item to backend:', response);
          this.getMenu(this.token);
      },
      error: (error) => {
          //console.error('Error adding menu item to backend:', error);
          this.returnErrorMenuItem = error;
      }
    });
  }


  checkDeliveryConditions(): void {
    console.log(this.deliveryConditions);
  }

  removeDeliveryCondition(condition: DiscoverDeliveryConditions) {
    this.managementService.removeDeliveryCondition(this.token, condition).subscribe({
      next: (response) => {
          //console.log('Successfully removed delivery condition from backend:', response);
          this.getDeliveryConditions(this.token);
      },
      error: (error) => {
          console.error('Error removing delivery condition from backend:', error);
      }
    });
  }

  getDeliveryConditions(token: string): void {
    this.managementService.getDeliveryConditions(token).subscribe({
        next: (response) => {
            //console.log('Successfully retrieved delivery conditions from backend:', response);
            this.deliveryConditions = response;
            //console.log(this.deliveryConditions);
        },
        error: (error) => {
            console.error('Error retrieving delivery conditions from backend:', error);
        }
    });
  }

  addDeliveryCondition(condition: DiscoverDeliveryConditions): void {
    this.managementService.addDeliveryCondition(this.token, condition).subscribe({
      next: (response) => {
          //console.log('Successfully added delivery condition to backend:', response);
          this.getDeliveryConditions(this.token);
      },
      error: (error) => {
          console.error('Error adding delivery condition to backend:', error);
      }
    });
  }

  charge = 10;
  distance = 10;
  min = 10;

  onSubmitRule() {
    let newCondition = new DiscoverDeliveryConditions(0, this.restaurantId, this.charge, this.distance, this.min); // id is ignored by backend

    //console.log(newCondition);

    this.managementService.addDeliveryCondition(this.token, newCondition).subscribe({
      next: (response) => {
          //console.log('Successfully added delivery condition to backend:', response);
          this.getDeliveryConditions(this.token);

          this.charge = 0;
          this.distance = 0;
          this.min = 0;
      },
      error: (error) => {
          console.error('Error adding delivery condition to backend:', error);
          this.returnErrorDeliveryCondition = error;
      }
    });
  }

  name = '';
  type = 'Starters';
  description = '';

  price = 0;

  onSubmitMenuItem() {
    let newItem = new DiscoverMenus(0, this.restaurantId, this.type, this.name, this.description, this.price); // id is ignored by backend

    //console.log(newItem);

    this.managementService.addToMenu(this.token, newItem).subscribe({
      next: (response) => {
          //console.log('Successfully added menu item to backend:', response);
          this.getMenu(this.token);

          this.name = '';
          this.type = '';
          this.description = '';
      },
      error: (error) => {
          console.error('Error adding menu item to backend:', error);
          this.returnErrorMenuItem = error;
      }
    });
  }

}
