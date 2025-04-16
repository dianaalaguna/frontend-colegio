/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  private userSubject = new BehaviorSubject<any>(this.getUserFromSession());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string, password: string }) {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials)
      .pipe(tap(res => {
        sessionStorage.setItem('token', res.token);
        const user = {
          id: res.user.id,
          username: res.user.username,
          nombres: res.user.nombres,
          apellidos: res.user.apellidos,
          estado: res.user.estado,
          tipoUsuario: res.user.tipoUsuario?.type || res.user.tipoUsuario
        };
        sessionStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user); // 🔁 Actualiza a los suscriptores
      }));
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('tab-id');
    localStorage.removeItem('active-tab-id');
    this.userSubject.next(null); // 🔁 Limpia el observable
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getUser() {
    return this.userSubject.value;
  }

  private getUserFromSession(): any {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

// ✅ Interfaz opcional para mejor autocompletado
interface User {
  id: number;
  username: string;
  nombres: string;
  apellidos: string;
  estado: string;
  tipoUsuario: { type: string }; // 👈 se mantiene como objeto
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  // ✅ Comienza el estado del usuario leyendo de sessionStorage
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromSession());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ Login: guarda token + user y actualiza el estado
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap(res => {
        sessionStorage.setItem('token', res.token);

        const user: User = {
          id: res.user.id,
          username: res.user.username,
          nombres: res.user.nombres,
          apellidos: res.user.apellidos,
          estado: res.user.estado,
          tipoUsuario: res.user.tipoUsuario // 👈 como objeto
        };

        sessionStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user); // 🔁 Notifica a quien esté suscrito
      })
    );
  }

  // ✅ Registro
  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  // ✅ Logout: limpia todo
  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('tab-id');
    localStorage.removeItem('active-tab-id');

    this.userSubject.next(null); // 🔁 Notifica logout
    this.router.navigate(['/login']);
  }

  // ✅ Verifica si el usuario está logueado
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  // ✅ Devuelve el usuario actual desde el observable
  getUser(): User | null {
    return this.userSubject.getValue();
  }

  // ✅ Carga el usuario desde sessionStorage
  private getUserFromSession(): User | null {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
