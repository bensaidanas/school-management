import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'src/app/models/subject';
import { Teacher } from 'src/app/models/teacher';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent {
  studentForm: FormGroup;
  subjects?: Subject[]

  constructor(
    public dialogRef: MatDialogRef<AddTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Teacher>, private fb: FormBuilder, private subjectService: SubjectService
  ) {
    this.getAllSubjects();
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      salaryBySession: ['', [Validators.required]],
      subject: [null, Validators.required],
    });
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((res) => {
      this.subjects = res
    })
  }

  onSaveClick(): void {
    console.log(this.studentForm)
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;
      this.data.firstName = formValues.firstName;
      this.data.lastName = formValues.lastName;
      this.data.email = formValues.email;
      this.data.phoneNumber = formValues.phoneNumber;
      this.data.address = formValues.address;
      this.data.salaryBySession = formValues.salaryBySession;
      this.data.subject = formValues.subject;

      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}