import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Grade } from '../models/grade';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private apiUrl = 'http://localhost:8080/grades'; 

  constructor(private http: HttpClient) { }

  // Add a new student
  add(subject: Partial<Grade>): Observable<Grade> {
    return this.http.post<Grade>(this.apiUrl, subject)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to add the student. Please try again later.');
        })
      );
  }

  // Update student information
  update(subject: Grade): Observable<Grade> {
    const url = `${this.apiUrl}/${subject.id}`;
    return this.http.put<Grade>(url, subject)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to update student information. Please try again later.');
        })
      );
  }

  getGradeById(gradeId: number): Observable<Grade> {
    const url = `${this.apiUrl}/${gradeId}`; // Replace 'api/classes' with the actual endpoint to retrieve class details
    return this.http.get<Grade>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch class details. Please try again later.');
        })
      );
  }


  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch grades. Please try again later.');
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
