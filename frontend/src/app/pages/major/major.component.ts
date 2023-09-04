import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Major } from 'src/app/models/major';
import { MajorService } from 'src/app/services/major.service';
import { AddMajorComponent } from './add-major/add-major.component';
import Swal from 'sweetalert2';
import { EditMajorComponent } from './edit-major/edit-major.component';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.css']
})
export class MajorComponent {
  displayedColumns: string[] = ['Libel', 'Actions']

  items!: Major[];

    constructor(private gradeService: MajorService, private dialog: MatDialog) {
    this.getAll();
  }

  getAll() {
    this.gradeService.getAllMajors().subscribe((res) => {
      this.items = res
    })
  }

  openAdd(enterAnimationDuration: string, exitAnimationDuration: string) : void {
    const dialogRef = this.dialog.open(AddMajorComponent, {
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

  openEdit(enterAnimationDuration: string, exitAnimationDuration: string, subject: Major) : void {
    const dialogRef = this.dialog.open(EditMajorComponent, {
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

  openDelete(subject: Major): void {
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
