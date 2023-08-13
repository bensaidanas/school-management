import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faPlus, faPenToSquare, faSquareRootVariable, faMicroscope, faLanguage, faUserTie, faGraduationCap } from '@fortawesome/free-solid-svg-icons'


import { Classroom } from 'src/app/models/classroom';
import { Grade } from 'src/app/models/grade';
import { Student } from 'src/app/models/student';
import { Subject } from 'src/app/models/subject';
import { Teacher } from 'src/app/models/teacher';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { AddClassComponent } from '../add-class/add-class.component';
import { EnroleStudentComponent } from './enrole-student/enrole-student.component';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  faEdit = faPenToSquare
  faGithub = faArrowLeft
  faMath = faSquareRootVariable
  faSvt = faMicroscope
  faLanguage = faLanguage
  faProf = faUserTie
  faStudent = faGraduationCap
  faPlus = faPlus

  students?: Student[];

  classroom!: Classroom;
  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const classId = +params.get('id')!;
      this.getClassDetails(classId);
    });
  }

  getClassDetails(classId: number) {
    this.classService.getClassById(classId).subscribe(
      classroom => {
        this.classroom = classroom;
        this.students = this.classroom.students
      },
      error => {
        console.error(error);
      }
    );
  }

  openAddStudent(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(EnroleStudentComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        classId: this.classroom.id
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.classService.addStudentToClass(result.classId, result.studentId).subscribe(res => {
          console.log("Student added to class")
          this.getClassDetails(this.classroom.id);
        })
      }
    });
  }
  
}
