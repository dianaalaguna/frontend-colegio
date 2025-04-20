import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SubjectService } from '../../services/subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-create',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css']
})
export class SubjectCreateComponent {
  nombre: string = '';
  grado: string = '';
  periodo: number | null = null;
  mensaje: string = '';

  constructor(private subjectService: SubjectService, private router: Router) {}

  crearMateria(): void {
    if (!this.nombre || !this.grado || !this.periodo) {
      this.mensaje = '⚠️ Todos los campos son obligatorios';
      return;
    }

    const nuevaMateria = {
      nombre: this.nombre,
      grado: this.grado,
      periodo: this.periodo
    };

    this.subjectService.crearMateria(nuevaMateria).subscribe({
      next: () => {
        this.mensaje = '✅ Materia creada exitosamente';
        setTimeout(() => this.router.navigate(['/subject-list']), 1000);
      },
      error: (err) => {
        console.error('Error al crear la materia', err);
        this.mensaje = '❌ Error al crear la materia';
      }
    });
  }
}
