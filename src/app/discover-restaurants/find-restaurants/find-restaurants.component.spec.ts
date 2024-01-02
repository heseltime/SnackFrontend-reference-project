import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindRestaurantsComponent } from './find-restaurants.component';

describe('FindRestaurantsComponent', () => {
  let component: FindRestaurantsComponent;
  let fixture: ComponentFixture<FindRestaurantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindRestaurantsComponent]
    });
    fixture = TestBed.createComponent(FindRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
