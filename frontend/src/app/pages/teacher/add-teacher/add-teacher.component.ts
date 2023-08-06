import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from 'src/app/models/teacher';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent {
  studentForm: FormGroup;
  subjects = [
    {id: 1, name: 'Math'},
    {id: 2, name: 'SVT'},
    {id: 3, name: 'PC'},
    {id: 4, name: 'French'},
    {id: 5, name: 'English'},
    {id: 6, name: 'Geography'},
  ];

  constructor(
    public dialogRef: MatDialogRef<AddTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Teacher>, private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      subjectId: [null, Validators.required],
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
      this.data.subjectId = formValues.subjectId;
      this.data.address = formValues.address;

      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}