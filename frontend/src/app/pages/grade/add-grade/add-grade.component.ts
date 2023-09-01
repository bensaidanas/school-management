import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Grade } from 'src/app/models/grade';

@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.css']
})
export class AddGradeComponent {
  studentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddGradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Grade>, private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      libel: ['', Validators.required],
    });
  }

  onSaveClick(): void {
    console.log(this.studentForm)
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;
      this.data.name = formValues.libel;
      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
