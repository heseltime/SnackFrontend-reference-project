import { TestBed } from '@angular/core/testing';

import { DiscoverRestaurantsService } from './discover-restaurants.service';

describe('DiscoverRestaurantsService', () => {
  let service: DiscoverRestaurantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoverRestaurantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
