import { Component } from '@angular/core';
import { EditGradeComponent } from './edit-grade/edit-grade.component';
import Swal from 'sweetalert2';
import { Grade } from 'src/app/models/grade';
import { GradeService } from 'src/app/services/grade.service';
import { AddGradeComponent } from './add-grade/add-grade.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent {
  displayedColumns: string[] = ['Libel', 'Actions']

  items!: Grade[];

    constructor(private gradeService: GradeService, private dialog: MatDialog) {
    this.getAll();
  }

  getAll() {
    this.gradeService.getAllGrades().subscribe((res) => {
      this.items = res
    })
  }

  openAdd(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(AddGradeComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        delete result.classes;
        console.log(result)
        this.gradeService.add(result).subscribe(res => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Niveau ajoutée avec succès",
            showConfirmButton: false,
            timer: 1500,
          })
          this.getAll()
        })
      }
    });
  }

  openEdit(enterAnimationDuration: string, exitAnimationDuration: string, subject: Grade) : void {
    const dialogRef = this.dialog.open(EditGradeComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      
      data: {subject: subject},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.gradeService.update(result.subject).subscribe(() => {
          this.toast.fire({
            icon: "success",
            title: "Modifier avec succès"
          })
        })
      }
    });
  }

  openDelete(subject: Grade): void {
    Swal.fire({
      title: `Êtes-vous sûr(e) de vouloir supprimer ce niveau "${subject.name}" ?`,
      icon: "question",
      showCancelButton: true,
      // showCloseButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      confirmButtonColor: "#7c3aed",
      reverseButtons: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.gradeService.delete(subject.id!).subscribe(() => {
          this.getAll();
          this.toast.fire({
            icon: "success",
            title: "Supprimé avec succès"
          })
        })
      }
    })
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
}
