// src/app/services/subject.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from '../models/subject.model';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private baseUrl = 'http://localhost:5000/api/subject'; // Ajusta si usas proxy

  constructor(private http: HttpClient) { }

  getSubjectsWithUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/with-users`);
  }

  getSubjectById(id: string): Observable<any> {
    return this.getSubjectsWithUsers().pipe(
      // Como no hay un endpoint directo por ID con users, filtramos
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

}
