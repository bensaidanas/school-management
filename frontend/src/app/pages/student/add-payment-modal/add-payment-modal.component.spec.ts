import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentModalComponent } from './add-payment-modal.component';

describe('AddPaymentModalComponent', () => {
  let component: AddPaymentModalComponent;
  let fixture: ComponentFixture<AddPaymentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPaymentModalComponent]
    });
    fixture = TestBed.createComponent(AddPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
