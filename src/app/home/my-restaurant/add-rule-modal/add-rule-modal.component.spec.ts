import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRuleModalComponent } from './add-rule-modal.component';

describe('AddRuleModalComponent', () => {
  let component: AddRuleModalComponent;
  let fixture: ComponentFixture<AddRuleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRuleModalComponent]
    });
    fixture = TestBed.createComponent(AddRuleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
