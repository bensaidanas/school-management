import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classroom } from 'src/app/models/classroom';
import { Student } from 'src/app/models/student';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-enrole-student',
  templateUrl: './enrole-student.component.html',
  styleUrls: ['./enrole-student.component.css']
})
export class EnroleStudentComponent {

  studentForm!: FormGroup;
  students?: Student[];

  constructor(private dialogRef: MatDialogRef<EnroleStudentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private fb: FormBuilder,
    private classService: ClassService
    ) {
      this.getStudents();
      this.studentForm = this.fb.group({
        studentId: [null, Validators.required],
    });
    }

    getStudents() {
      this.classService.getStudentsNotInClass(this.data.classId).subscribe((res) => {
        this.students = res
      })
    }

    onSaveClick(): void {
      console.log(this.studentForm)
      if (this.studentForm.valid) {
        const formValues = this.studentForm.value;
        this.data.studentId = formValues.studentId
        this.dialogRef.close(this.data);
      }
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}
