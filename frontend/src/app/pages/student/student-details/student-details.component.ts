import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { faArrowLeft, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { GradeService } from 'src/app/services/grade.service';
import { StudentPayment } from 'src/app/models/studentPayment';
import { StudentPaymentService } from 'src/app/services/student-payment.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  faEdit = faUserPen
  faGithub = faArrowLeft

  student!: Student;
  paymentRecords!: StudentPayment[];
  displayedColumns: string[] = ['Class Name', 'Month', 'Year', 'Amount', 'Status']
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private paymentService: StudentPaymentService
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
    this.paymentService.getPaymentsByStudent(studentId).subscribe((res) => {
      this.paymentRecords = res
    })
  }

  
}
