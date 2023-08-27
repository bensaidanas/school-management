import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private apiUrl = 'http://localhost:8080/subjects'; // Replace this with the actual API URL to your json-server

  constructor(private http: HttpClient) { }

  // Get all subjects
  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch subjects. Please try again later.');
        })
      );
  }

  // Get a subject by ID
  getSubjectById(subjectId: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.apiUrl}/${subjectId}`)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch subject. Please try again later.');
        })
      );
  }

  // Add a new student
  add(subject: Partial<Subject>): Observable<Subject> {
    return this.http.post<Subject>(this.apiUrl, subject)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to add the student. Please try again later.');
        })
      );
  }

  // Update student information
  update(subject: Subject): Observable<Subject> {
    const url = `${this.apiUrl}/${subject.id}`;
    return this.http.put<Subject>(url, subject)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to update student information. Please try again later.');
        })
      );
  }

  delete(subjectId: number) {
    return this.http.get(`${this.apiUrl}/delete/${subjectId}`)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          throw error;
        })
      );
  }
}
