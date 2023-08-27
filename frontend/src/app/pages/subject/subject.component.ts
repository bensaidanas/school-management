import { Component } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from '../../models/subject';
import Swal from 'sweetalert2';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { MatDialog } from '@angular/material/dialog';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {
  displayedColumns: string[] = ['Libel', 'Actions']

  items!: Subject[];

    constructor(private subjectService: SubjectService, private dialog: MatDialog) {
    this.getAll();
  }

  getAll() {
    this.subjectService.getAllSubjects().subscribe((res) => {
      this.items = res
    })
  }

  openAdd(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(AddSubjectComponent, {
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
        this.subjectService.add(result).subscribe(res => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Matière ajoutée avec succès",
            showConfirmButton: false,
            timer: 1500,
          })
          this.getAll()
        })
      }
    });
  }

  openEdit(enterAnimationDuration: string, exitAnimationDuration: string, subject: Subject) : void {
    const dialogRef = this.dialog.open(EditSubjectComponent, {
      // height: '500px',
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      
      data: {subject: subject},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.subjectService.update(result.subject).subscribe(() => {
          this.toast.fire({
            icon: "success",
            title: "Modifier avec succès"
          })
        })
      }
    });
  }

  openDelete(subject: Subject): void {
    Swal.fire({
      title: `Êtes-vous sûr(e) de vouloir supprimer la matière de ${subject.name} ?`,
      icon: "question",
      showCancelButton: true,
      // showCloseButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      confirmButtonColor: "#7c3aed",
      reverseButtons: true
    }).then((res) => {
      if (res.isConfirmed) {
        this.subjectService.delete(subject.id!).subscribe(() => {
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
