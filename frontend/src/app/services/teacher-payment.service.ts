import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeacherPayment } from '../models/teacherPayment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherPaymentService {

  private apiUrl = 'http://localhost:8080/teacher-payment'; // Replace this with the actual API URL to your json-server

  constructor(private http: HttpClient) { }

  // Get all teachers from the last teacher added
  getPaymentsByTeacher(teacherId: number) : Observable<TeacherPayment[]> {
    return this.http.get<TeacherPayment[]>(`${this.apiUrl}/teacher/${teacherId}`)
  }

  add(teacher: Partial<TeacherPayment>): Observable<TeacherPayment> {
    return this.http.post<TeacherPayment>(this.apiUrl, teacher)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to add the teacher. Please try again later.');
        })
      );
  }
}
