import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classroom } from 'src/app/models/classroom';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-teacher-payment',
  templateUrl: './add-teacher-payment.component.html',
  styleUrls: ['./add-teacher-payment.component.css']
})
export class AddTeacherPaymentComponent {
  studentForm: FormGroup;
  classes?: Classroom[];
  months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  lastYear = this.currentYear - 1;
  nextYear = this.currentYear + 1;

  years = [this.nextYear, this.currentYear, this.lastYear];

  constructor(
    private dialogRef: MatDialogRef<AddTeacherPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private teacherService: TeacherService
  ) {
    const currentMonthIndex = this.currentDate.getMonth();
    const defaultMonth = this.months[currentMonthIndex];

    this.studentForm = this.fb.group({
      month: [defaultMonth, Validators.required],
      year: [this.years[1], Validators.required]
    });

    this.classes = data.classes

    this.calculateTotal();
  }

  

  calculateTotal(): number {
    let total = 0;
  
    for (const classroom of this.data.classes!) {
      total += classroom.sessionNumber * this.data.teacher.salaryBySession;
      console.log("hi anas")
    }
    console.log("totale", total)
    return total;
    
  }

  onSaveClick(): void {
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;
      this.data.month = formValues.month;
      this.data.year = formValues.year;
      this.data.amount = this.calculateTotal();
      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
