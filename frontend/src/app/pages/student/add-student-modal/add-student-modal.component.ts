import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    {id: 2, name: 'SVT'},
    {id: 3, name: 'Sciences Mathématiques'},
    {id: 4, name: 'Sciences PC'},
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
      grade: [null, Validators.required],
      major: [null]
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
      this.data.grade = formValues.grade;
      this.data.major = formValues.major || {id: 1};

      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
