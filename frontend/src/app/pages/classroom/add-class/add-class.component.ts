import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classroom } from 'src/app/models/classroom';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {
  studentForm: FormGroup;
  teachers!: Teacher[]
  grades = [
    {id: 1, name: 'Tronc Commun'},
    {id: 2, name: 'Première année Bac'},
    {id: 3, name: 'Deuxième année Bac'},
  ];

  constructor(
    public dialogRef: MatDialogRef<AddClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Classroom>, private fb: FormBuilder,
    private teacherService: TeacherService
  ) {
    this.getTeachers();
    this.studentForm = this.fb.group({
      className: ['', Validators.required],
      sessionsNumber: ['', Validators.required],
      gradeId: [null, Validators.required],
      teacher: [null, Validators.required],
    });
  }

  getTeachers() {
    this.teacherService.getAllTeachers().subscribe((res) => {
      this.teachers = res
    })
  }

  onSaveClick(): void {
    console.log(this.studentForm)
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;
      this.data.name = formValues.className;
      this.data.gradeId = formValues.gradeId;
      this.data.teacher = formValues.teacher;
      this.data.sessionNumber = formValues.sessionsNumber;

      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
