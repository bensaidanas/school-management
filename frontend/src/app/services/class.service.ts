import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classroom } from '../models/classroom';
import { Observable, catchError, throwError } from 'rxjs';
import { Grade } from '../models/grade';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiUrl = 'http://localhost:3000/classrooms'; 

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
}
