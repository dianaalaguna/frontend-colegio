import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';

@Component({
  standalone: true,
  selector: 'app-subject-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './subject-list.component.html'
})
export class SubjectListComponent implements OnInit {
  subjects: any[] = [];
  deleteMessage: string | null = null; // Mensaje para la eliminación

  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjectsWithUsers().subscribe(data => {
      this.subjects = data;
    });
  }

  deleteSubject(id: string): void {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta materia?');
    if (!confirmDelete) return;

    this.subjectService.deleteSubject(id).subscribe({
      next: () => {
        // Actualizar el listado después de la eliminación
        this.subjects = this.subjects.filter(subject => subject._id !== id);
        this.deleteMessage = 'La materia ha sido eliminada correctamente.'; // Mensaje de éxito

        // Reiniciar el mensaje después de 3 segundos
        setTimeout(() => {
          this.deleteMessage = null;
        }, 3000);
      },
      error: err => {
        console.error('Error al eliminar materia:', err);
        alert('Ocurrió un error al eliminar la materia.');
      }
    });
  }
}
