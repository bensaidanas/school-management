import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherPaymentComponent } from './add-teacher-payment.component';

describe('AddTeacherPaymentComponent', () => {
  let component: AddTeacherPaymentComponent;
  let fixture: ComponentFixture<AddTeacherPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTeacherPaymentComponent]
    });
    fixture = TestBed.createComponent(AddTeacherPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
