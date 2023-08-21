import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from 'src/app/models/teacher';
import { ClassService } from 'src/app/services/class.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent {
  studentForm: FormGroup;
  teachers?: Teacher[]

  constructor(
    public dialogRef: MatDialogRef<ClassEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, 
    private teacherService: TeacherService
  ) {
    this.getTeachers();
    this.studentForm = this.fb.group({
      className: ['', Validators.required],
      sessionsNumber: ['', Validators.required],
      teacher: [this.data.classroom.teacher, Validators.required],
      price: [null, Validators.required],
    });
  }

  getTeachers() {
    this.teacherService.getAllTeachers().subscribe((res) => {
      this.teachers = res
    })
  }

  compareTeachers(subject1: Teacher, subject2: Teacher): boolean {
    return subject1 && subject2 ? subject1.id === subject2.id : subject1 === subject2;
  }
  

  onSaveClick(): void {
    console.log(this.studentForm)
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;
      this.data.classroom.name = formValues.className;
      this.data.classroom.grade = formValues.grade;
      this.data.classroom.teacher = formValues.teacher;
      this.data.classroom.sessionNumber = formValues.sessionsNumber;
      this.data.classroom.price = formValues.price;
      console.log(this.data);
      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
