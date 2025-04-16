import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Usuario ya logueado → redirigirlo a una ruta segura
      const user = this.authService.getUser();
      //const role = user?.tipoUsuario?.type || user?.tipoUsuario;

      this.router.navigate(['/acercade']);

      return false;
    }

    return true; // ✅ Permitir acceso si NO está logueado
  }
}
