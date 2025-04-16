import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './app/guards/auth.guard';
import { NoAuthGuard } from './app/guards/no-auth.guard';

const routes: Routes = [
  { path: '', loadComponent: () => import('./app/pages/login/login.component').then(m => m.LoginComponent), canActivate: [NoAuthGuard] },
  { path: 'login', loadComponent: () => import('./app/pages/login/login.component').then(m => m.LoginComponent), canActivate: [NoAuthGuard] },
  { path: 'register', loadComponent: () => import('./app/pages/register/register.component').then(m => m.RegisterComponent), canActivate: [NoAuthGuard] },
  { path: 'tasks', loadComponent: () => import('./app/pages/tasks/tasks.component').then(m => m.TasksComponent), canActivate: [AuthGuard] },
  { path: 'usuarios', loadComponent: () => import('./app/pages/usuarios/usuarios.component').then(m => m.UsuariosComponent), canActivate: [AuthGuard] },
  { path: 'asignatura', loadComponent: () => import('./app/pages/asignaturas/asignaturas.component').then(m => m.AsignaturasComponent), canActivate: [AuthGuard] },
  { path: 'estudiantes', loadComponent: () => import('./app/pages/estudiantes/estudiantes.component').then(m => m.EstudiantesComponent), canActivate: [AuthGuard] },
  { path: 'acercade', loadComponent: () => import('./app/pages/acercade/acercade.component').then(m => m.AcercadeComponent), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/acercade', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});
