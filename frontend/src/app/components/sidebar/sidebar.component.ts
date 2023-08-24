import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router) {}

  logout() {
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir vous déconnecter ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Déconnecter",
      cancelButtonText: "Restez connecté"
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Déconnecté avec succès",
          showConfirmButton: false,
          timer: 750,
        })
        this.router.navigate(['/login'])
      }
    })
  }
}
