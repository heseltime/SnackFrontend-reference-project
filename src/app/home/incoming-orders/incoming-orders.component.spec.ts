import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingOrdersComponent } from './incoming-orders.component';

describe('IncomingOrdersComponent', () => {
  let component: IncomingOrdersComponent;
  let fixture: ComponentFixture<IncomingOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomingOrdersComponent]
    });
    fixture = TestBed.createComponent(IncomingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
