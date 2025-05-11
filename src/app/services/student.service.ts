import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  //private baseUrl = 'http://localhost:5000/api/student';
  private baseUrl = `${environment.apiUrl}/student`;

  constructor(private http: HttpClient) { }

  createStudent(student: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createstudent`, student);
  }

  updateStudent(codigoEstudiante: string, data: Partial<Student>): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatestudentbycode/${codigoEstudiante}`, data);
  }

  getStudentByCode(codigoEstudiante: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getstudentbycode/${codigoEstudiante}`);
  }

  getStudentsByEmail(correoTutor: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/getstudentsbyemail/${correoTutor}`);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/getallstudents`);
  }

  deleteUser(codigoEstudiante: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletestudentbycode/${codigoEstudiante}`);
  }

  getStudentsNotAssigned(subjectId: string): Observable<Student[]> {
    const url = `${this.baseUrl}/${subjectId}/unassigned-students`;
    return this.http.get<Student[]>(url);
  }
}
