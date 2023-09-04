import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Major } from 'src/app/models/major';

@Component({
  selector: 'app-add-major',
  templateUrl: './add-major.component.html',
  styleUrls: ['./add-major.component.css']
})
export class AddMajorComponent {
  studentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddMajorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Major>, private fb: FormBuilder
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
