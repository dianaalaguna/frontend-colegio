import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserTypeService, UserType } from '../../services/user-type.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userTypes: UserType[] = [];

  formData = {
    username: '',
    password: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    tipoUsuario: null as string | null
  };

  constructor(
    private userTypeService: UserTypeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userTypeService.getUserTypes().subscribe({
      next: (tipos) => {
        this.userTypes = tipos;
        if (tipos.length > 0) {
          // Selecciona automáticamente el primer tipo de usuario
          this.formData.tipoUsuario = tipos[0]._id;
        }
      },
      error: (err) => {
        console.error('Error al cargar tipos de usuario:', err);
      }
    });
  }

  onSubmit(): void {
    this.authService.register(this.formData).subscribe({
      next: (res) => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Error al registrar. Verifica los datos.');
      }
    });
  }
}
