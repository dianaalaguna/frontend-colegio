import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { UserService } from '../../services/user.service'; // Servicio para obtener usuarios
import { Subject } from '../../models/subject.model';
import { User } from '../../models/user.model'; // Modelo para usuario

@Component({
  selector: 'app-asignar-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importas los módulos necesarios
  templateUrl: './asignar-profesor.component.html',
  styleUrls: ['./asignar-profesor.component.css']
})
export class AsignarProfesorComponent implements OnInit {
  subjects: Subject[] = []; // Lista de materias
  profesores: User[] = []; // Lista de profesores
  selectedProfesorId: string | null = null; // Profesor seleccionado, inicializado a null
  selectedSubjectId: string | null = null; // Materia seleccionada, inicializado a null

  constructor(
    private subjectService: SubjectService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userService.getProfesores().subscribe(profesores => {
      this.profesores = profesores;

      // Esperar a que se carguen los profesores antes de cargar las materias
      this.loadSubjects();
    });
  }


  // Cargar todas las materias
  loadSubjects(): void {
    this.subjectService.getSubjectsWithoutProfessors().subscribe(data => {
      this.subjects = data.map(subject => {
        let selectedProfesorId = '';

        // Si hay profesores asignados, toma el primero y asegúrate que sea string
        if (subject.profesores && subject.profesores.length > 0) {
          selectedProfesorId = String(subject.profesores[0]);
        }

        return {
          ...subject,
          selectedProfesorId
        };
      });
    });
  }

  // Cargar todos los profesores
  loadProfesores(): void {
    this.userService.getProfesores().subscribe(
      (data) => {
        console.log('Profesores:', data);
        this.profesores = data;
      }
    );
  }

  // Asociar el profesor a la materia
  asignarProfesor(subject: Subject): void {
    const profesorId = subject.selectedProfesorId;

    if (!profesorId) {
      alert('Por favor selecciona un profesor');
      return;
    }

    this.subjectService.asociarProfesor(subject._id!, profesorId).subscribe({
      next: (response) => {
        alert('Profesor asignado correctamente');

        // Opcional: recarga la lista para mostrar el cambio
        this.loadSubjects();
      },
      error: (err) => {
        alert(err.error.message || 'Error al asignar profesor');
        console.error(err);
      }
    });
  }

  trackBySubjectId(index: number, subject: Subject): string {
    return subject._id!;
  }

}

