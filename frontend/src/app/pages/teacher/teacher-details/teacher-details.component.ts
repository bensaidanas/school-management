import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Payment } from 'src/app/models/payment';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { faArrowLeft, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { Classroom } from 'src/app/models/classroom';
import { MatDialog } from '@angular/material/dialog';
import { AddTeacherPaymentComponent } from './add-teacher-payment/add-teacher-payment.component';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {
  faEdit = faUserPen
  faGithub = faArrowLeft
  teacher!: Teacher;
  payments!: Payment[];
  classes!: Classroom[];
  displayedColumns: string[] = ['Class Name', 'Month', 'Amount', 'Status']

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    public dialog: MatDialog
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
      },
      error => {
        console.error(error);
      }
    );
  }

  openAddPayment(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(AddTeacherPaymentComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {classes: this.classes},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        // delete result.classes;
        // console.log(result)
        // this.paymentService.addPaymentForStudent(this.student.id!, result).subscribe(res => {
        //   console.log("Payment Added")
        //   this.getPaymentRecords(this.student.id!);
        // })
      }
    });
  }

  


}
