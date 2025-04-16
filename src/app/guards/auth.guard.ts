import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('Verificando si el usuario está logueado...');
      if (this.authService.isLoggedIn()) {
        console.log('Usuario autenticado. Permitido acceder');
        return true;  // Si el usuario está autenticado, permite el acceso.
      } else {
        console.log('Usuario no autenticado. Redirigiendo al login...');
        this.router.navigate(['/login']);  // Si no está autenticado, redirige al login.
        return false;
      }
  }
}

