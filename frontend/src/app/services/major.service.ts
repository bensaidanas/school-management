import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Major } from '../models/major';

@Injectable({
  providedIn: 'root'
})
export class MajorService {


  private apiUrl = 'http://localhost:8080/majors'; 

  constructor(private http: HttpClient) { }

  getGradeById(gradeId: number): Observable<Major> {
    const url = `${this.apiUrl}/${gradeId}`; // Replace 'api/classes' with the actual endpoint to retrieve class details
    return this.http.get<Major>(url)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch class details. Please try again later.');
        })
      );
  }

  getAllMajors(): Observable<Major[]> {
    return this.http.get<Major[]>(this.apiUrl)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to fetch majors. Please try again later.');
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

  add(subject: Partial<Major>): Observable<Major> {
    return this.http.post<Major>(this.apiUrl, subject)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to add the student. Please try again later.');
        })
      );
  }

  // Update student information
  update(subject: Major): Observable<Major> {
    const url = `${this.apiUrl}/${subject.id}`;
    return this.http.put<Major>(url, subject)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Failed to update student information. Please try again later.');
        })
      );
  }
}
