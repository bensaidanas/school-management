import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.css']
})
export class AddStudentModalComponent {
  studentForm: FormGroup;
  grades = [
    {id: 1, name: 'Tronc Commun'},
    {id: 2, name: 'Première année Bac'},
    {id: 3, name: 'Deuxième année Bac'},
  ];

  majors = [
    {id: 1, name: 'Sciences de la Vie et de la Terre'},
    {id: 2, name: 'Sciences Mathématiques'},
    {id: 3, name: 'Sciences Physiques et Chimiques'},
  ];

  constructor(
    public dialogRef: MatDialogRef<AddStudentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Student>, private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      gradeId: [null, Validators.required],
      majorId: [null]
    });
  }

  onSaveClick(): void {
    console.log(this.studentForm)
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;
      this.data.firstName = formValues.firstName;
      this.data.lastName = formValues.lastName;
      this.data.email = formValues.email;
      this.data.phoneNumber = formValues.phoneNumber;
      this.data.gradeId = formValues.gradeId;
      this.data.majorId = formValues.majorId;

      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
