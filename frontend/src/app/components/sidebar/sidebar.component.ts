import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  showParamSubMenu = false;

  toggleParamSubMenu() {
    this.showParamSubMenu = !this.showParamSubMenu;
  }

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
