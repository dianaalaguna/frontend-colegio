import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
      this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          sessionStorage.setItem('auth_token', res.token);
          window.location.href = '/tasks';
        },
        error: err => {
          alert('Credenciales inválidas');
        }
      });
  }
}
