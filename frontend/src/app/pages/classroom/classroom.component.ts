import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Classroom } from 'src/app/models/classroom';
import { ClassService } from 'src/app/services/class.service';
import { AddClassComponent } from './add-class/add-class.component';
import { Grade } from 'src/app/models/grade';
import { Teacher } from 'src/app/models/teacher';
import { Subject } from 'src/app/models/subject';
import { TeacherService } from 'src/app/services/teacher.service';
import { faLanguage, faSquareRootVariable, faMicroscope } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  faMath = faSquareRootVariable
  faSvt = faMicroscope
  faLanguage = faLanguage
  classrooms!: Classroom[];


  constructor(private classService: ClassService, public dialog: MatDialog, private teacherService: TeacherService) { }

  ngOnInit() {
    this.getAllClasses();
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe(
      (classrooms) => {
        this.classrooms = classrooms;
        this.populateGrades(classrooms)
        this.populateSubjects(classrooms.map(classroom => classroom.teacher));
      },
      (error) => {
        console.error(error);
        // Handle error (optional): Show a user-friendly message on the UI.
      }
    );
  }

  populateGrades(students: Classroom[]) {
    for (const student of students) {
      this.classService.getGradeById(student.gradeId).subscribe(
        (grade: Grade) => {
          student.gradeName = grade.name;
        },
        error => {
          console.error(error);
        }
      );
      
    }
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

  

  openAddClass(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(AddClassComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: Partial<Classroom>) => {
      console.log(result);
      if (result) {
        this.classService.addClass(result).subscribe(res => {
          this.getAllClasses();
        })
      }
    });
  }
}

