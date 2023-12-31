import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Grade } from 'src/app/models/grade';
import { Major } from 'src/app/models/major';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { GradeService } from 'src/app/services/grade.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  faStudent = faGraduationCap
  students!: Student[];

  constructor(private studentService: StudentService, private gradeService: GradeService, public dialog: MatDialog) { }

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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Étudiant ajouté avec succès",
            showConfirmButton: false,
            timer: 1500,
          })
          this.getAllStudents();
        })
      }
    });
  }
}
