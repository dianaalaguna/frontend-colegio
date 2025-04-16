// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${username}`);
  }

  updateUser(username: string, data: Partial<User>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${username}`, data);
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${username}`);
  }
}
