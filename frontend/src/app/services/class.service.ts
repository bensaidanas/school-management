import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classroom } from '../models/classroom';
import { Observable, catchError, throwError } from 'rxjs';
import { Grade } from '../models/grade';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiUrl = 'http://localhost:8080/classrooms'; 

  constructor(private http: HttpClient) { }

  // Get all students from the last student added
  getAllClasses(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong. Please try again later.');
        })
      );
  }

  // Get a single student by ID
  getClassById(classId: number): Observable<Classroom> {
    const url = `${this.apiUrl}/${classId}`;
    return this.http.get<Classroom>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch student details. Please try again later.');
        })
      );
  }

  // Add a new student
  addClass(classroom: Partial<Classroom>): Observable<Classroom> {
    return this.http.post<Classroom>(this.apiUrl, classroom)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to add the student. Please try again later.');
        })
      );
  }

  getStudentsNotInClass(classId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/${classId}/non-enrolled-students`)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to get students. Please try again later.');
        })
      )
  }

  addStudentToClass(classId: number, studentId: number) {
    return this.http.post(`${this.apiUrl}/${classId}/students/${studentId}`, {})
  }


}
