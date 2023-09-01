import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css']
})
export class EditGradeComponent {
  studentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditGradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder
  ) {
    console.log(data)
    this.studentForm = this.fb.group({
      libel: [data.subject.name, Validators.required],
    });
  }

  onSaveClick(): void {
    console.log(this.studentForm)
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;
      this.data.subject.name = formValues.libel;

      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
