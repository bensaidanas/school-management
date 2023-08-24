import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { faArrowLeft, faUserPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { GradeService } from 'src/app/services/grade.service';
import { StudentPayment } from 'src/app/models/studentPayment';
import { StudentPaymentService } from 'src/app/services/student-payment.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentModalComponent } from '../add-payment-modal/add-payment-modal.component';
import { Classroom } from 'src/app/models/classroom';
import Swal from 'sweetalert2';
import { StudentEditComponent } from '../student-edit/student-edit.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  faEdit = faUserPen
  faGithub = faArrowLeft
  faDelete = faTrashCan

  student!: Student;
  classes!: Classroom[];
  paymentRecords!: StudentPayment[];
  displayedColumns: string[] = ['Class Name', 'Month', 'Year', 'Amount', 'Status']
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private paymentService: StudentPaymentService,
    public dialog: MatDialog,
    private router: Router
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment Added successfully",
            showConfirmButton: false,
            timer: 1500,
          })
          this.getPaymentRecords(this.student.id!);
        })
      }
    });
  }

  openEdit(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(StudentEditComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {student: this.student},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.studentService.updateStudent(result.student).subscribe(() => {
          this.toast.fire({
            icon: "success",
            title: "Modifier avec succès"
          })
        })
      }
    });
  }

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  delete(student: Student): void {
    Swal.fire({
      title: `Are you sure you want to delete ${student.firstName} ${student.lastName}?`,
      icon: "question",
      showCancelButton: true,
      // showCloseButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      confirmButtonColor: "#7c3aed",
      reverseButtons: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.studentService.deleteStudent(student.id!).subscribe(() => {
          this.router.navigate(['/student']);
          this.toast.fire({
            icon: "success",
            title: "Supprimé avec succès"
          })
        })
      }
    })
  }

  
}
