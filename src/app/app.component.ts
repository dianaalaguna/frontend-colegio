import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavBarComponent], // 👈 Importa el nuevo componente
  template: `
    <app-nav-bar></app-nav-bar> <!-- 👈 Aquí insertas el menú -->
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
