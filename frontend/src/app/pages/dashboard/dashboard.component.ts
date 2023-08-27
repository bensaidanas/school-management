import { Component } from '@angular/core';
import { faUserTie, faLandmark, faUserGraduate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  faProf = faUserTie
  faClass = faLandmark
  faStudent = faUserGraduate

}
