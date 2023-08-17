import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Payment } from 'src/app/models/payment';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { faArrowLeft, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { Classroom } from 'src/app/models/classroom';
import { MatDialog } from '@angular/material/dialog';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
import Swal from 'sweetalert2';
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
    public dialog: MatDialog,
    private router: Router
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

  openEdit(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(TeacherEditComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {teacher: this.teacher},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.teacherService.updateTeacher(result.teacher).subscribe(() => {
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

  delete(teacher: Teacher): void {
    Swal.fire({
      title: `Êtes-vous sûr(e) de vouloir supprimer le/la professeur ${teacher.firstName} ${teacher.lastName}?`,
      icon: "question",
      showCancelButton: true,
      // showCloseButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      confirmButtonColor: "#7c3aed",
      reverseButtons: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.teacherService.deleteTeacher(teacher.id).subscribe(() => {
          this.router.navigate(['/teacher']);
          this.toast.fire({
            icon: "success",
            title: "Supprimé avec succès"
          })
        })
      }
    })
  }


}
