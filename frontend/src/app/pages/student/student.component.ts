import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Grade } from 'src/app/models/grade';
import { Major } from 'src/app/models/major';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students!: Student[];

  constructor(private studentService: StudentService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getAllStudents().subscribe(
      (students) => {
        this.students = students;
        this.populateGrades(students)
        this.populateMajors(students)
      },
      (error) => {
        console.error(error);
        // Handle error (optional): Show a user-friendly message on the UI.
      }
    );
  }

  populateGrades(students: Student[]) {
    for (const student of students) {
      this.studentService.getGradeById(student.gradeId).subscribe(
        (grade: Grade) => {
          student.gradeName = grade.name;
        },
        error => {
          console.error(error);
        }
      );
      
    }
  }
  populateMajors(students: Student[]) {
    for (const student of students) {
      this.studentService.getMajorById(student.majorId).subscribe(
        (major: Major) => {
          student.majorName = major.name;
        },
        error => {
          console.error(error);
        }
      );
      
    }
  }

  openAddStudentModal(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(AddStudentModalComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: Partial<Student>) => {
      console.log(result);
      if (result) {
        this.studentService.addStudent(result).subscribe(res => {
          console.log("Student Added")
          this.getAllStudents();
        })
      }
    });
  }
}
