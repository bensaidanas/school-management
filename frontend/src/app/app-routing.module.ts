import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './pages/student/student.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { StudentDetailsComponent } from './pages/student/student-details/student-details.component';

const routes: Routes = [
  {path: 'student', component: StudentComponent},
  { path: 'student-details/:id', component: StudentDetailsComponent },
  {path: 'teacher', component: TeacherComponent},
  {path: 'class', component: ClassroomComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
