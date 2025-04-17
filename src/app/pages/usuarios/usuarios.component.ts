import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];
  editCache: { [key: string]: User } = {};
  busquedaUsername: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.usuarios = users;
        this.inicializarEditCache();
      },
      error: (err) => {
        console.error('Error al cargar los usuarios', err);
      }
    });
  }

  buscarUsuario(): void {
    const username = this.busquedaUsername.trim();
    if (!username) return;

    this.userService.getUserByUsername(username).subscribe({
      next: (user) => {
        this.usuarios = [user];
        this.inicializarEditCache();
      },
      error: (err) => {
        console.error('Usuario no encontrado', err);
        this.usuarios = [];
      }
    });
  }

  inicializarEditCache(): void {
    this.editCache = {};
    this.usuarios.forEach(user => {
      this.editCache[user.username] = { ...user };
    });
  }

  hasChanges(username: string): boolean {
    return JSON.stringify(this.editCache[username]) !== JSON.stringify(this.usuarios.find(user => user.username === username));
  }

  onChange(username: string, field: 'nombres' | 'apellidos' | 'telefono' | 'username', value: any): void {
    if (this.editCache[username]) {
      this.editCache[username][field] = value;
    }
  }

  saveChanges(username: string): void {
    const updatedUser = this.editCache[username];
    this.userService.updateUser(username, updatedUser).subscribe({
      next: () => {
        console.log('Usuario actualizado');
        this.loadUsuarios();
      },
      error: (err) => {
        console.error('Error al guardar los cambios', err);
      }
    });
  }

  deleteUser(username: string): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmacion) return;

    this.userService.deleteUser(username).subscribe({
      next: () => {
        console.log('Usuario eliminado');
        this.loadUsuarios();
      },
      error: (err) => {
        console.error('Error al eliminar el usuario', err);
      }
    });
  }

  resetBusqueda(): void {
    this.busquedaUsername = '';
    this.loadUsuarios();
  }
}

