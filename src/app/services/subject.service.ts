import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from '../models/subject.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  //private baseUrl = 'http://localhost:5000/api/subject';
  private baseUrl = `${environment.apiUrl}/subject`;

  constructor(private http: HttpClient) { }

  getSubjectsWithUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/with-users`);
  }

  getSubjectsWithoutProfessors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/without-professors`);
  }

  getSubjectById(id: string): Observable<any> {
    return this.getSubjectsWithUsers().pipe(
      map(subjects => subjects.find(subject => subject._id === id))
    );
  }

  crearMateria(data: { nombre: string; grado: string; periodo: number }) {
    return this.http.post(`${this.baseUrl}/createsubject`, data);
  }

  // Método para eliminar una materia por ID
  deleteSubject(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletesubjectbyid/${id}`);
  }

  // Actualizar materia por ID
  updateSubject(id: string, subject: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateSubjectById/${id}`, subject);
  }

  removeEstudianteFromSubject(subjectId: string, estudianteId: string) {
    return this.http.delete(`${this.baseUrl}/remove-estudiante/${subjectId}`, {
      body: { estudianteId }
    });
  }

  removeProfesorFromSubject(subjectId: string, profesorId: string) {
    return this.http.delete(`${this.baseUrl}/remove-profesor/${subjectId}`, {
      body: { profesorId }
    });
  }

  // Método para asociar un profesor a una materia
  addProfesorToSubject(subjectId: string, profesorId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/add-profesor-to-subject/${subjectId}`, { profesorId });
  }

  // Obtener todas las materias
  getAllSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.baseUrl}/getallsubjects`);
  }

  // Asociar un profesor a una materia
  asociarProfesor(subjectId: string, profesorId: string) {
    return this.http.post(`${this.baseUrl}/${subjectId}/add-profesor`, { profesorId });
  }

  asociarEstudiante(subjectId: string, studentId: string) {
    return this.http.post(`${this.baseUrl}/${subjectId}/add-estudiante`, {
      estudianteId: studentId,
    });
  }

}
