import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-estudiantes-lista',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './estudiantes-lista.component.html',
  styleUrl: './estudiantes-lista.component.css'
})
export class EstudiantesListaComponent implements OnInit {
  estudiantes: Student[] = [];
  editCache: { [key: string]: Student } = {};
  busquedaEmailTutor: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadEstudiantes();
  }

  loadEstudiantes(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.estudiantes = students;
        this.inicializarEditCache();
      },
      error: (err) => {
        console.error('Error al cargar los estudiantes', err);
      }
    });
  }

  buscarEstudiante(): void {
    const correoTutor = this.busquedaEmailTutor.trim();
    if (!correoTutor) return;

    this.studentService.getStudentsByEmail(correoTutor).subscribe({
      next: (students) => {
        this.estudiantes = students;
        this.inicializarEditCache();
      },
      error: (err) => {
        console.error('Usuario no encontrado', err);
        this.estudiantes = [];
      }
    });
  }

  inicializarEditCache(): void {
    this.editCache = {};
    this.estudiantes.forEach(student => {
      this.editCache[student.codigoEstudiante] = { ...student };
    });
  }

  hasChanges(codigoEstudiante: string): boolean {
    return JSON.stringify(this.editCache[codigoEstudiante]) !== JSON.stringify(this.estudiantes.find(student => student.codigoEstudiante === codigoEstudiante));
  }

  onChange(codigoEstudiante: string, field: 'codigoEstudiante' | 'nombres' | 'apellidos' | 'correoTutor', value: any): void {
    if (this.editCache[codigoEstudiante]) {
      this.editCache[codigoEstudiante][field] = value;
    }
  }

  saveChanges(codigoEstudiante: string): void {
    const updatedStudent = this.editCache[codigoEstudiante];
    console.log('Guardando estudiante:', updatedStudent);
    this.studentService.updateStudent(codigoEstudiante, updatedStudent).subscribe({
      next: () => {
        console.log('Estudiante actualizado');
        this.loadEstudiantes();
      },
      error: (err) => {
        console.error('Error al guardar los cambios', err);
      }
    });
  }

  deleteUser(codigoEstudiante: string): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este estudiante?');
    if (!confirmacion) return;

    this.studentService.deleteUser(codigoEstudiante).subscribe({
      next: () => {
        console.log('Usuario eliminado');
        this.loadEstudiantes();
      },
      error: (err) => {
        console.error('Error al eliminar el usuario', err);
      }
    });
  }

  resetBusqueda(): void {
    this.busquedaEmailTutor = '';
    this.loadEstudiantes();
  }
}

