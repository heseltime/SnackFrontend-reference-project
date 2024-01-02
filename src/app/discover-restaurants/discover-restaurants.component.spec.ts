import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverRestaurantsComponent } from './discover-restaurants.component';

describe('DiscoverRestaurantsComponent', () => {
  let component: DiscoverRestaurantsComponent;
  let fixture: ComponentFixture<DiscoverRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoverRestaurantsComponent]
    });
    fixture = TestBed.createComponent(DiscoverRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
