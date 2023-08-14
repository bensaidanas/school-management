import { TestBed } from '@angular/core/testing';

import { StudentPaymentService } from './student-payment.service';

describe('StudentPaymentService', () => {
  let service: StudentPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
