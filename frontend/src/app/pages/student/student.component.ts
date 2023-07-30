import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students!: Student[];

  constructor(private studentService: StudentService, private dialogService: DialogService) { }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error(error);
        // Handle error (optional): Show a user-friendly message on the UI.
      }
    );
  }

  openAddStudentModal() {
    const ref = this.dialogService.open(AddStudentModalComponent, {
      header: 'Add New Student',
      width: '50%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' }
    });

    ref.onClose.subscribe((newStudentData: any) => {
      if (newStudentData) {
        this.studentService.addStudent(newStudentData).subscribe((res) => {
          console.log(res)
          this.getAllStudents();
        })
        console.log('New Student Data:', newStudentData);
      }
    });
  }
}
