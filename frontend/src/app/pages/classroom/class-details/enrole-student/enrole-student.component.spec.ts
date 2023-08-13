import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnroleStudentComponent } from './enrole-student.component';

describe('EnroleStudentComponent', () => {
  let component: EnroleStudentComponent;
  let fixture: ComponentFixture<EnroleStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnroleStudentComponent]
    });
    fixture = TestBed.createComponent(EnroleStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
