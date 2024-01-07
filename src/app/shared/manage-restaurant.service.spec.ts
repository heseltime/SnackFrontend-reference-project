import { TestBed } from '@angular/core/testing';

import { ManageRestaurantService } from './manage-restaurant.service';

describe('ManageRestaurantService', () => {
  let service: ManageRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
