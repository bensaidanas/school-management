import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {
  teacher!: Teacher;
  payments!: Payment[];

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const teacherId = +params.get('id')!;
      this.getTeacherDetails(teacherId);
      this.getPaymentRecords(teacherId);
    });
  }

  getTeacherDetails(teacherId: number) {
    this.teacherService.getTeacherById(teacherId).subscribe(
      teacher => {
        this.teacher = teacher;
      },
      error => {
        console.error(error);
      }
    );
  }

  getPaymentRecords(teacherId: number) {
    this.teacherService.getPaymentsByTeacherId(teacherId).subscribe(
      payments => {
        this.payments = payments;
        this.populateClassNames(payments);
      },
      error => {
        console.error(error);
      }
    );
  }

  populateClassNames(paymentRecords: Payment[]) {
    for (const record of paymentRecords) {
      this.teacherService.getClassById(record.classId).subscribe(
        classroom => {
          record.className = classroom.name;
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  
}
