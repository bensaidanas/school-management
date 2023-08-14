import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { faArrowLeft, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { GradeService } from 'src/app/services/grade.service';
import { StudentPayment } from 'src/app/models/studentPayment';
import { StudentPaymentService } from 'src/app/services/student-payment.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentModalComponent } from '../add-payment-modal/add-payment-modal.component';
import { Classroom } from 'src/app/models/classroom';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  faEdit = faUserPen
  faGithub = faArrowLeft

  student!: Student;
  classes!: Classroom[];
  paymentRecords!: StudentPayment[];
  displayedColumns: string[] = ['Class Name', 'Month', 'Year', 'Amount', 'Status']
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private paymentService: StudentPaymentService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const studentId = +params.get('id')!;
      this.getStudentDetails(studentId);
      this.getStudentClasses(studentId)
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

  getStudentClasses(studentId: number) {
    this.studentService.getStudentClasses(studentId).subscribe((res) => {
      this.classes = res;
    })
  }

  getPaymentRecords(studentId: number) {
    this.paymentService.getPaymentsByStudent(studentId).subscribe((res) => {
      this.paymentRecords = res
    })
  }

  openAddPayment(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(AddPaymentModalComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {classes: this.classes},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        delete result.classes;
        console.log(result)
        this.paymentService.addPaymentForStudent(this.student.id!, result).subscribe(res => {
          console.log("Payment Added")
          this.getPaymentRecords(this.student.id!);
        })
      }
    });
  }

  
}
