import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'src/app/models/subject';
import { faUserTie, faSquareRootVariable, faMicroscope } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teachers!: Teacher[];
  faProf = faUserTie
  faMath = faSquareRootVariable
  faSvt = faMicroscope

    constructor(
      private teacherService: TeacherService, 
      public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.teacherService.getAllTeachers().subscribe(
      (teachers) => {
        this.teachers = teachers;
        this.populateSubjects(teachers)
      },
      (error) => {
        console.error(error);
        // Handle error (optional): Show a user-friendly message on the UI.
      }
    );
  }

  populateSubjects(teachers: Teacher[]) {
    for (const teacher of teachers) {
      this.teacherService.getSubjectById(teacher.subjectId).subscribe(
        (subject: Subject) => {
          teacher.subjectName = subject.name;
        },
        error => {
          console.error(error);
        }
      );
      
    }
  }

  openModal(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(AddTeacherComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: Partial<Teacher>) => {
      console.log(result);
      if (result) {
        this.teacherService.addTeacher(result).subscribe(res => {
          this.getAllTeachers();
        })
      }
    });
  }
}
