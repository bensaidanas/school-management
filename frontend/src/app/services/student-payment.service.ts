import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentPayment } from '../models/studentPayment';

@Injectable({
  providedIn: 'root'
})
export class StudentPaymentService {

  private apiUrl = 'http://localhost:8080/student-payments'; 

  constructor(private http: HttpClient) { }

  getPaymentsByStudent(studentId: number) : Observable<StudentPayment[]> {
    return this.http.get<StudentPayment[]>(`${this.apiUrl}/students/${studentId}`)
  }


  addPaymentForStudent(studentId: number, data: any) {
    console.log(data)
    return this.http.post(`${this.apiUrl}/students/${studentId}`, data)
  }

}
