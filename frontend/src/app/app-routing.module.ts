import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './pages/student/student.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { StudentDetailsComponent } from './pages/student/student-details/student-details.component';
import { TeacherDetailsComponent } from './pages/teacher/teacher-details/teacher-details.component';
import { ClassDetailsComponent } from './pages/classroom/class-details/class-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'parameters', component: ParametersComponent},
  {path: 'student', component: StudentComponent},
  { path: 'student-details/:id', component: StudentDetailsComponent },
  {path: 'teacher', component: TeacherComponent},
  { path: 'teacher-details/:id', component: TeacherDetailsComponent },
  {path: 'class', component: ClassroomComponent},
  { path: 'class-details/:id', component: ClassDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
