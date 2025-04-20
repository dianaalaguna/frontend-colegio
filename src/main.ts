import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AuthGuard } from './app/guards/auth.guard';
import { NoAuthGuard } from './app/guards/no-auth.guard';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth.interceptor'; // 👈 Asegúrate que esta ruta esté correcta

const routes: Routes = [
  { path: '', loadComponent: () => import('./app/pages/login/login.component').then(m => m.LoginComponent), canActivate: [NoAuthGuard] },
  { path: 'login', loadComponent: () => import('./app/pages/login/login.component').then(m => m.LoginComponent), canActivate: [NoAuthGuard] },
  { path: 'register', loadComponent: () => import('./app/pages/register/register.component').then(m => m.RegisterComponent), canActivate: [NoAuthGuard] },
  { path: 'usuarios', loadComponent: () => import('./app/pages/usuarios/usuarios.component').then(m => m.UsuariosComponent), canActivate: [AuthGuard] },
  { path: 'asignatura', loadComponent: () => import('./app/pages/asignaturas/asignaturas.component').then(m => m.AsignaturasComponent), canActivate: [AuthGuard] },
  { path: 'estudiantes', loadComponent: () => import('./app/pages/estudiantes/estudiantes.component').then(m => m.EstudiantesComponent), canActivate: [AuthGuard] },
  { path: 'estudiantes-lista', loadComponent: () => import('./app/pages/estudiantes-lista/estudiantes-lista.component').then(m => m.EstudiantesListaComponent), canActivate: [AuthGuard] },
  { path: 'subject-list', loadComponent: () => import('./app/pages/subject-list/subject-list.component').then(m => m.SubjectListComponent), canActivate: [AuthGuard] },
  { path: 'subject-detail/:id', loadComponent: () => import('./app/pages/subject-detail/subject-detail.component').then(m => m.SubjectDetailComponent), canActivate: [AuthGuard] },
  { path: 'subject-create', loadComponent: () => import('./app/pages/subject-create/subject-create.component').then(m => m.SubjectCreateComponent), canActivate: [AuthGuard] },
  { path: 'subject-update/:id', loadComponent: () => import('./app/pages/subject-update/subject-update.component').then(m => m.SubjectUpdateComponent), canActivate: [AuthGuard] },
  { path: 'acercade', loadComponent: () => import('./app/pages/acercade/acercade.component').then(m => m.AcercadeComponent), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/acercade', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // 👈 esto permite que el interceptor funcione
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    importProvidersFrom(FormsModule)
  ]
});
