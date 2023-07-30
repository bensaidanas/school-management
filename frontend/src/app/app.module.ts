import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StudentComponent } from './pages/student/student.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentDetailsComponent } from './pages/student/student-details/student-details.component'

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    StudentComponent,
    TeacherComponent,
    ClassroomComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
