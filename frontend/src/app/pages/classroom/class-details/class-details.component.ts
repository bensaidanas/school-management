import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faPenToSquare, faSquareRootVariable, faMicroscope, faLanguage, faUserTie, faGraduationCap } from '@fortawesome/free-solid-svg-icons'


import { Classroom } from 'src/app/models/classroom';
import { Grade } from 'src/app/models/grade';
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

  students = [
    {id: 1, firstName: "Anas", lastName: "Bensaid"},
    {id: 2, firstName: "Nadir", lastName: "Nadir"},
    {id: 3, firstName: "Omar", lastName: "Bennaoui"},
    {id: 4, firstName: "Jhon", lastName: "Doe"},
    {id: 4, firstName: "Jhon", lastName: "Doe"},
    {id: 4, firstName: "Jhon", lastName: "Doe"},
    {id: 4, firstName: "Jhon", lastName: "Doe"},
    {id: 4, firstName: "Jhon", lastName: "Doe"},
  ]

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
        this.populateGrades(classroom)
      },
      error => {
        console.error(error);
      }
    );
  }

  populateGrades(classroom: Classroom) {
      this.classService.getGradeById(classroom.gradeId).subscribe(
        (grade: Grade) => {
          classroom.gradeName = grade.name;
        },
        error => {
          console.error(error);
        })
  }
  
}
