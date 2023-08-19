import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Grade } from 'src/app/models/grade';
import { Major } from 'src/app/models/major';
import { GradeService } from 'src/app/services/grade.service';
import { MajorService } from 'src/app/services/major.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent {
  studentForm: FormGroup;
  grades?: Grade[]
  majors?: Major[]

  constructor(
    public dialogRef: MatDialogRef<StudentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder, 
    private gradeService: GradeService,
    private majorService: MajorService
  ) {
    console.log(this.data.teacher)
    this.getAllGrades();
    this.getAllMajors();
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      grade: [this.data.student.grade, Validators.required],
      major: [this.data.student.major],
    });
    console.log(this.studentForm.controls['grade'].value?.id)

  }

  getAllGrades() {
    this.gradeService.getAllGrades().subscribe((res) => {
      this.grades = res
    })
  }
  getAllMajors() {
    this.majorService.getAllMajors().subscribe((res) => {
      this.majors = res
    })
  }

  compareGrades(subject1: Grade, subject2: Grade): boolean {
    return subject1 && subject2 ? subject1.id === subject2.id : subject1 === subject2;
  }


  compareMajors(major1: Major, major2: Major): boolean {
    return major1 && major2 ? major1.id === major2.id : major1 === major2;
  }
  

  onSaveClick(): void {
    console.log(this.studentForm)
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;
      this.data.student.firstName = formValues.firstName;
      this.data.student.lastName = formValues.lastName;
      this.data.student.email = formValues.email;
      this.data.student.phoneNumber = formValues.phoneNumber;
      this.data.student.grade = formValues.grade
      if (this.data.student.grade.id === 1) {
        this.data.student.major = {id: 1, name: "None"}
      } else {
        this.data.student.major = formValues.major
      }
      // console.log(this.data.student)
      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
