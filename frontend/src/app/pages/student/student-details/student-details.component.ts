import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentRecord } from 'src/app/models/payment-record';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { faArrowLeft, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { GradeService } from 'src/app/services/grade.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  faEdit = faUserPen
  faGithub = faArrowLeft

  student!: Student;
  paymentRecords!: PaymentRecord[];
  displayedColumns: string[] = ['Class Name', 'Month', 'Amount', 'Status']
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private gradeService: GradeService
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
