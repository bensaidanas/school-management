import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.css']
})
export class AddStudentModalComponent {
  newStudent!: Student;
  firstName!: string;
  lastName!: string;
  email!: string;
  phoneNumber!: string;
  major!: string;
  year!: number;

  constructor(public ref: DynamicDialogRef) {}

  onSubmit() {
    this.newStudent = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      major: this.major,
      year: this.year
    }
    this.ref.close(this.newStudent); // Close the modal and pass back the new student data
  }

  onCancel() {
    this.ref.close(); // Close the modal without passing any data
  }
}
