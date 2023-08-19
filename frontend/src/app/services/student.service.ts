import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Classroom } from '../models/classroom';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/students'; 

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

  deleteStudent(studentId: number) {
    return this.http.delete(`${this.apiUrl}/${studentId}`)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          throw error;
        })
      );
  }

  getStudentClasses(studentId: number): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${this.apiUrl}/${studentId}/classes`)
  }

}
