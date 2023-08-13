import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faPenToSquare, faSquareRootVariable, faMicroscope, faLanguage, faUserTie, faGraduationCap } from '@fortawesome/free-solid-svg-icons'


import { Classroom } from 'src/app/models/classroom';
import { Grade } from 'src/app/models/grade';
import { Student } from 'src/app/models/student';
import { Subject } from 'src/app/models/subject';
import { Teacher } from 'src/app/models/teacher';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

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

  students?: Student[];

  classroom!: Classroom;
  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private teacherService: TeacherService
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


  
}
