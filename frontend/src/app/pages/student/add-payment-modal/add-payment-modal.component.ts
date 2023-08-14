import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classroom } from 'src/app/models/classroom';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-add-payment-modal',
  templateUrl: './add-payment-modal.component.html',
  styleUrls: ['./add-payment-modal.component.css']
})
export class AddPaymentModalComponent {
  studentForm!: FormGroup;
  classes!: Classroom[]
  months =  [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  lastYear = this.currentYear - 1;
  nextYear = this.currentYear + 1;

  years = [this.nextYear, this.currentYear, this.lastYear];

  constructor(private dialogRef: MatDialogRef<AddPaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private fb: FormBuilder,
    ) {
      this.classes = data.classes
      console.log(this.classes)
      this.studentForm = this.fb.group({
        classroomId: [null, Validators.required],
        month: [null, Validators.required],
        year: [null, Validators.required],
        
    });
    }


    


    onSaveClick(): void {
      console.log(this.studentForm)
      if (this.studentForm.valid) {
        const formValues = this.studentForm.value;
        this.data.classroomId = formValues.classroomId;
        this.data.month = formValues.month;
        this.data.year = formValues.year;
        this.dialogRef.close(this.data);
      }
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}
