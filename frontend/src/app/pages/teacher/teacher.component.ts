import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { MatDialog } from '@angular/material/dialog';
import { faUserTie, faSquareRootVariable, faMicroscope, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { faReact } from "@fortawesome/free-brands-svg-icons"

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
  faPc = faReact
  faLanguage = faLanguage

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
      },
      (error) => {
        console.error(error);
        // Handle error (optional): Show a user-friendly message on the UI.
      }
    );
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
