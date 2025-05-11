import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TabSessionService {

  private currentTabId = Math.random().toString(36).substr(2, 9);

  constructor(private router: Router) {}

  initTabSessionControl(): void {
    sessionStorage.setItem('tab-id', this.currentTabId);

    const activeTabId = localStorage.getItem('active-tab-id');
    const isDuplicate = activeTabId && activeTabId !== this.currentTabId;
    const isAlreadyOnLogin = window.location.pathname === '/login';
    const hasToken = !!sessionStorage.getItem('token');

    if (isDuplicate && !isAlreadyOnLogin && hasToken) {
      console.warn('Pestaña duplicada detectada, cerrando sesión');
      sessionStorage.removeItem('token');
      localStorage.removeItem('active-tab-id');
      this.router.navigate(['/login']); // ⬅️ redirección Angular-friendly
    } else {
      localStorage.setItem('active-tab-id', this.currentTabId);

      window.addEventListener('beforeunload', () => {
        const storedTabId = sessionStorage.getItem('tab-id');
        if (storedTabId === localStorage.getItem('active-tab-id')) {
          localStorage.removeItem('active-tab-id');
        }
      });
    }
  }
}
