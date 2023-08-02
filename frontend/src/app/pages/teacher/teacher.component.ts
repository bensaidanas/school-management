import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teachers!: Teacher[];

    constructor(
      private teacherService: TeacherService, 
      private dialogService: DialogService, 
    ) { }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
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

  addModal(): void {
    const dialogRef = this.dialogService.open(AddTeacherComponent, {
      header: 'New Teacher',
      width: '70%',
      contentStyle: { 'min-height': '200px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    dialogRef.onClose.subscribe((data: Teacher) => {
      if (data) {
        // console.log(data);
        this.addArticle(data);
      }
    });
  }

  addArticle(data: Teacher) {
    this.teacherService.addTeacher(data).subscribe(
      (teacher: Teacher) => {
              this.teachers.unshift(teacher); // Add the new announcement at the beginning of the array
            },
            (error: any) => {
              console.error('An error occurred:', error);
            }
    )
  }
}
