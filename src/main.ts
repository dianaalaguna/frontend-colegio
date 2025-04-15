import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './app/guards/auth.guard';

import { LoginComponent } from './app/pages/login/login.component';
import { RegisterComponent } from './app/pages/register/register.component';
import { TasksComponent } from './app/pages/tasks/tasks.component';

// Rutas
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

// ⚠️ Control de pestañas

const currentTabId = Math.random().toString(36).substr(2, 9);
sessionStorage.setItem('tab-id', currentTabId);

const activeTabId = localStorage.getItem('active-tab-id');
const isDuplicate = activeTabId && activeTabId !== currentTabId;
const isAlreadyOnLogin = window.location.pathname === '/login';

// Si ya hay otra pestaña activa y no estamos ya en /login
if (isDuplicate && !isAlreadyOnLogin) {
  console.warn('⚠️ Pestaña duplicada detectada, cerrando sesión');
  sessionStorage.removeItem('token');
  localStorage.removeItem('active-tab-id'); // Opcional: limpiar también del localStorage
  window.location.href = '/login';
} else {
  // Esta pestaña es la activa
  localStorage.setItem('active-tab-id', currentTabId);

  // Detectar si el usuario cierra esta pestaña o recarga
  window.addEventListener('beforeunload', () => {
    const storedTabId = sessionStorage.getItem('tab-id');
    if (storedTabId === localStorage.getItem('active-tab-id')) {
      localStorage.removeItem('active-tab-id');
    }
  });

  // ✅ Arrancamos Angular normalmente
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient()
    ]
  });
}
