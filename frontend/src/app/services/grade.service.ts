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
}
