import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PaymentRecord } from '../models/payment-record';
import { Classroom } from '../models/classroom';
import { Grade } from '../models/grade';
import { Major } from '../models/major';

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

  // Get a single student by ID
  getStudentById(studentId: number): Observable<Student> {
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.get<Student>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch student details. Please try again later.');
        })
      );
  }

  // Add a new student
  addStudent(student: Partial<Student>): Observable<Student> {
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
      const url = `http://localhost:3000/paymentRecords?studentId=${studentId}`;
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
      const url = `http://localhost:3000/paymentRecords/${paymentRecord.id}`;
      return this.http.patch<PaymentRecord>(url, { isPaid: !paymentRecord.isPaid })
        .pipe(
          catchError((error: any) => {
            console.error('An error occurred:', error);
            return throwError('Failed to toggle payment status. Please try again later.');
          })
        );
    }

     // Get a single class by ID
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

  getGradeById(gradeId: number): Observable<Grade> {
    const url = `http://localhost:3000/grades/${gradeId}`; // Replace 'api/classes' with the actual endpoint to retrieve class details
    return this.http.get<Grade>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch class details. Please try again later.');
        })
      );
  }
  getMajorById(majorId: number): Observable<Major> {
    const url = `http://localhost:3000/majors/${majorId}`; // Replace 'api/classes' with the actual endpoint to retrieve class details
    return this.http.get<Major>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch class details. Please try again later.');
        })
      );
  }
}
