import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-major',
  templateUrl: './edit-major.component.html',
  styleUrls: ['./edit-major.component.css']
})
export class EditMajorComponent {
  studentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditMajorComponent>,
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
