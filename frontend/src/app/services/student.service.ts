import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PaymentRecord } from '../models/payment-record';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students'; 
  
  constructor(private http: HttpClient) { }

  // Get all students from the last student added
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong. Please try again later.');
        })
      );
  }

  // Add a new student
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to add the student. Please try again later.');
        })
      );
  }

  // Update student information
  updateStudent(student: Student): Observable<Student> {
    const url = `${this.apiUrl}/${student.id}`;
    return this.http.put<Student>(url, student)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to update student information. Please try again later.');
        })
      );
  }

   // Get all payment records of a student by student ID
    getPaymentRecordsByStudentId(studentId: number): Observable<PaymentRecord[]> {
      const url = `${this.apiUrl}/paymentRecords?studentId=${studentId}`;
      return this.http.get<PaymentRecord[]>(url)
        .pipe(
          catchError((error: any) => {
            console.error('An error occurred:', error);
            return throwError('Failed to fetch payment records. Please try again later.');
          })
        );
    }

    // Toggle the isPaid property of a payment record
    togglePaymentStatus(paymentRecord: PaymentRecord): Observable<PaymentRecord> {
      const url = `${this.apiUrl}/paymentRecords/${paymentRecord.id}`;
      return this.http.patch<PaymentRecord>(url, { isPaid: !paymentRecord.isPaid })
        .pipe(
          catchError((error: any) => {
            console.error('An error occurred:', error);
            return throwError('Failed to toggle payment status. Please try again later.');
          })
        );
    }
}
