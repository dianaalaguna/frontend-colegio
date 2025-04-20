import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SubjectService } from '../../services/subject.service';
import { Student } from '../../models/student.model';
import { User } from '../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-subject-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './subject-detail.component.html'
})
export class SubjectDetailComponent implements OnInit {
  subject: any = null;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subjectService.getSubjectById(id).subscribe(subject => {
        this.subject = subject;
      });
    }
  }

  desvincularEstudiante(estudianteId: string) {
    if (!this.subject?._id) return;

    const confirmacion = confirm('¿Estás seguro de desvincular al estudiante?');
    if (!confirmacion) return;

    this.subjectService.removeEstudianteFromSubject(this.subject._id, estudianteId).subscribe({
      next: () => {
        this.subject!.estudiantes = this.subject!.estudiantes.filter((est: Student) => est._id !== estudianteId);
      },
      error: err => {
        console.error('Error al desvincular estudiante:', err);
        alert('Error al desvincular estudiante');
      }
    });
  }

  desvincularProfesor(profesorId: string) {
    if (!this.subject?._id) return;

    const confirmacion = confirm('¿Estás seguro de desvincular al profesor?');
    if (!confirmacion) return;

    this.subjectService.removeProfesorFromSubject(this.subject._id, profesorId).subscribe({
      next: () => {
        this.subject!.profesores = this.subject!.profesores.filter((prof: User) => prof._id !== profesorId);
      },
      error: err => {
        console.error('Error al desvincular profesor:', err);
        alert('Error al desvincular profesor');
      }
    });
  }

}
