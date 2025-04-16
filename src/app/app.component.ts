import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { TabSessionService } from './services/tab-session.service'; // 👈 importa el servicio

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavBarComponent],
  template: `
    <app-nav-bar></app-nav-bar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  private tabSession = inject(TabSessionService); // 👈 inyecta el servicio

  ngOnInit(): void {
    this.tabSession.initTabSessionControl(); // 👈 ejecuta la lógica de control de pestañas
  }
}
