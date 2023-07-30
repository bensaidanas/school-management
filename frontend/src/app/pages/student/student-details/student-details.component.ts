import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentRecord } from 'src/app/models/payment-record';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student!: Student;
  paymentRecords!: PaymentRecord[];

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const studentId = +params.get('id')!;
      this.getStudentDetails(studentId);
      this.getPaymentRecords(studentId);
    });
  }

  getStudentDetails(studentId: number) {
    this.studentService.getStudentById(studentId).subscribe(
      student => {
        this.student = student;
      },
      error => {
        console.error(error);
      }
    );
  }

  getPaymentRecords(studentId: number) {
    this.studentService.getPaymentRecordsByStudentId(studentId).subscribe(
      paymentRecords => {
        this.paymentRecords = paymentRecords;
        this.populateClassNames(paymentRecords);
      },
      error => {
        console.error(error);
      }
    );
  }

  populateClassNames(paymentRecords: PaymentRecord[]) {
    for (const record of paymentRecords) {
      this.studentService.getClassById(record.classId).subscribe(
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
