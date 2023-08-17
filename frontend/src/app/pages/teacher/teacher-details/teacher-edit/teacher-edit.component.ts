import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Teacher } from 'src/app/models/teacher';
import { SubjectService } from 'src/app/services/subject.service';
import { AddTeacherComponent } from '../../add-teacher/add-teacher.component';
import { Subject } from 'src/app/models/subject';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent {
  studentForm: FormGroup;
  subjects?: Subject[]

  constructor(
    public dialogRef: MatDialogRef<AddTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private subjectService: SubjectService
  ) {
    console.log(this.data.teacher)
    this.getAllSubjects();
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      salaryBySession: ['', [Validators.required]],
      subject: [this.data.teacher.subject, Validators.required],
    });
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((res) => {
      this.subjects = res
    })
  }

  compareSubjects(subject1: Subject, subject2: Subject): boolean {
    return subject1 && subject2 ? subject1.id === subject2.id : subject1 === subject2;
  }
  

  onSaveClick(): void {
    console.log(this.studentForm)
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;
      this.data.teacher.firstName = formValues.firstName;
      this.data.teacher.lastName = formValues.lastName;
      this.data.teacher.email = formValues.email;
      this.data.teacher.phoneNumber = formValues.phoneNumber;
      this.data.teacher.address = formValues.address;
      this.data.teacher.salaryBySession = formValues.salaryBySession;
      this.data.teacher.subject = formValues.subject;
      // console.log(this.data.teacher)
      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
