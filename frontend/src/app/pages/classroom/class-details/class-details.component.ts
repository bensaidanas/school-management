import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faPlus, faPenToSquare, faSquareRootVariable, faMicroscope, faLanguage, faUserTie, faGraduationCap, faTrashCan } from '@fortawesome/free-solid-svg-icons'


import { Classroom } from 'src/app/models/classroom';
import { Student } from 'src/app/models/student';
import { ClassService } from 'src/app/services/class.service';
import { EnroleStudentComponent } from './enrole-student/enrole-student.component';
import { ClassEditComponent } from './class-edit/class-edit.component';
import Swal from 'sweetalert2';

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
  faPlus = faPlus
  faDelete = faTrashCan

  students?: Student[];

  classroom!: Classroom;
  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const classId = +params.get('id')!;
      this.getClassDetails(classId);
      this.getStudentsInClass(classId);
    });
  }

  getStudentsInClass(id: number) {
    this.classService.getStudentsInClass(id).subscribe((res) => {
      this.students = res
    })
  }

  getClassDetails(classId: number) {
    this.classService.getClassById(classId).subscribe(
      classroom => {
        this.classroom = classroom;
      },
      error => {
        console.error(error);
      }
    );
  }

  openAddStudent(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(EnroleStudentComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        classId: this.classroom.id
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.classService.addStudentToClass(result.classId, result.studentId).subscribe(res => {
          console.log("Student added to class")
          this.getClassDetails(this.classroom.id);
          this.getStudentsInClass(this.classroom.id);
        })
      }
    });
  }

  openEdit(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(ClassEditComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {classroom: this.classroom},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        console.log(result.classroom)
        this.classService.updateClass(result.classroom).subscribe(() => {
          this.toast.fire({
            icon: "success",
            title: "Modifier avec succès"
          })
          this.getClassDetails(this.classroom.id);
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

  delete(classroom: Classroom): void {
    Swal.fire({
      title: `Êtes-vous sûr(e) de vouloir supprimer ce cours ${classroom.name}?`,
      icon: "question",
      showCancelButton: true,
      // showCloseButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      confirmButtonColor: "#7c3aed",
      reverseButtons: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.classService.deleteClass(classroom.id!).subscribe(() => {
          this.router.navigate(['/class']);
          this.toast.fire({
            icon: "success",
            title: "Supprimé avec succès"
          })
        })
      }
    })
  }

  unrollStudent(student: Student) {
    Swal.fire({
      title: `Êtes-vous sûr(e) de vouloir désinscrire cet étudiant ${student.firstName} ${student.lastName}?`,
      icon: "question",
      showCancelButton: true,
      // showCloseButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      confirmButtonColor: "#7c3aed",
      reverseButtons: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.classService.unenrollStudentFromClass(this.classroom.id, student.id!).subscribe(() => {
          this.toast.fire({
            icon: "success",
            title: "Supprimé avec succès"
          })
          this.getClassDetails(this.classroom.id);
          this.getStudentsInClass(this.classroom.id);
        })
      }
    })
  }
  
}
