import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:5000/api/student';

  constructor(private http: HttpClient) {}

  createStudent(student: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createstudent`, student);
  }

  updateStudent(student: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatestudent/${student.codigoEstudiante}`, student);
  }

  getStudentByCode(codigoEstudiante: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getstudentbycode/${codigoEstudiante}`);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/getallstudents`);
  }
}
