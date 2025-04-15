import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';  // Ajusta si cambias el puerto del backend

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string, password: string }) {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials)
      .pipe(tap(res => {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('user', JSON.stringify(res.user));
      }));
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tab-id');
    localStorage.removeItem('active-tab-id');
    this.router.navigate(['/login']);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;  // Retorna true si hay un token, false si no
  }

  getUser() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
