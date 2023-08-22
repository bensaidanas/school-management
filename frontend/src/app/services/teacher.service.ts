import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../models/teacher';
import { Observable, catchError, throwError } from 'rxjs';
import { Payment } from '../models/payment';
import { Classroom } from '../models/classroom';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = 'http://localhost:8080/teachers'; // Replace this with the actual API URL to your json-server

  constructor(private http: HttpClient) { }

  // Get all teachers from the last teacher added
  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong. Please try again later.');
        })
      );
  }

  // Get a single student by ID
  getTeacherById(teacherId: number): Observable<Teacher> {
    const url = `${this.apiUrl}/${teacherId}`;
    return this.http.get<Teacher>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch teacher details. Please try again later.');
        })
      );
  }

  deleteTeacher(teacherId: number) {
    return this.http.get(`${this.apiUrl}/delete/${teacherId}`)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to delete teacher. Please try again later.');
        })
      );
  }

  // Add a new teacher
  addTeacher(teacher: Partial<Teacher>): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to add the teacher. Please try again later.');
        })
      );
  }

  // Update teacher information
  updateTeacher(teacher: Teacher): Observable<Teacher> {
    const url = `${this.apiUrl}/${teacher.id}`;
    return this.http.put<Teacher>(url, teacher)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to update teacher information. Please try again later.');
        })
      );
  }

  // Get all payments of a teacher by teacher ID
  getPaymentsByTeacherId(teacherId: number): Observable<Payment[]> {
    const url = `${this.apiUrl}/${teacherId}/payments`;
    return this.http.get<Payment[]>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch payments. Please try again later.');
        })
      );
  }

  // Toggle the isPaid property of a payment
  togglePaymentStatus(payment: Payment): Observable<Payment> {
    const url = `${this.apiUrl}/${payment.teacherId}/payments/${payment.id}`;
    return this.http.patch<Payment>(url, { isPaid: !payment.isPaid })
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to toggle payment status. Please try again later.');
        })
      );
  }

  getClassById(classId: number): Observable<Classroom> {
    const url = `http://localhost:3000/classrooms/${classId}`; // Replace 'api/classes' with the actual endpoint to retrieve class details
    return this.http.get<Classroom>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch class details. Please try again later.');
        })
      );
  }

  getClassesTaughtByTeacher(teacherId: number): Observable<Classroom[]> {
    const url = `${this.apiUrl}/${teacherId}/classes`;
    return this.http.get<Classroom[]>(url);
  }

  
}
