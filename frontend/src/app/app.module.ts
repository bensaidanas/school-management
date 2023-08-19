import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StudentComponent } from './pages/student/student.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentDetailsComponent } from './pages/student/student-details/student-details.component';
import { MaterialModule } from 'src/material.module';
import { AddStudentModalComponent } from './pages/student/add-student-modal/add-student-modal.component';
import { TeacherDetailsComponent } from './pages/teacher/teacher-details/teacher-details.component';
import { AddTeacherComponent } from './pages/teacher/add-teacher/add-teacher.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddClassComponent } from './pages/classroom/add-class/add-class.component';
import { ClassDetailsComponent } from './pages/classroom/class-details/class-details.component';
import { EnroleStudentComponent } from './pages/classroom/class-details/enrole-student/enrole-student.component';
import { AddPaymentModalComponent } from './pages/student/add-payment-modal/add-payment-modal.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ParametersComponent } from './pages/parameters/parameters.component';
import { LoginComponent } from './pages/login/login.component';
import { AddTeacherPaymentComponent } from './pages/teacher/teacher-details/add-teacher-payment/add-teacher-payment.component';
import { TeacherEditComponent } from './pages/teacher/teacher-details/teacher-edit/teacher-edit.component';
import { StudentEditComponent } from './pages/student/student-edit/student-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    StudentComponent,
    TeacherComponent,
    ClassroomComponent,
    StudentDetailsComponent,
    AddStudentModalComponent,
    TeacherDetailsComponent,
    AddTeacherComponent,
    AddClassComponent,
    ClassDetailsComponent,
    EnroleStudentComponent,
    AddPaymentModalComponent,
    DashboardComponent,
    ParametersComponent,
    LoginComponent,
    AddTeacherPaymentComponent,
    TeacherEditComponent,
    StudentEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
