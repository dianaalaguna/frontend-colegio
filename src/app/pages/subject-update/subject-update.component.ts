import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Necesario para el uso de ngModel
import { SubjectService } from '../../services/subject.service'; // El servicio para manejar las materias
import { ActivatedRoute } from '@angular/router'; // Para obtener el id de la URL
import { Subject } from '../../models/subject.model'; // Modelo de la materia
import { Router } from '@angular/router';

@Component({
  standalone: true,  // Hacemos que el componente sea standalone
  selector: 'app-subject-update',
  imports: [CommonModule, RouterModule, FormsModule],  // Importamos los módulos necesarios
  templateUrl: './subject-update.component.html',
  styleUrls: ['./subject-update.component.css']
})
export class SubjectUpdateComponent implements OnInit {
  subject: Subject | null = null;  // Aquí almacenaremos la materia que vamos a editar
  updateMessage: string | null = null;  // Mensaje para mostrar después de actualizar

  constructor(
    private subjectService: SubjectService,  // Inyectamos el servicio
    private route: ActivatedRoute,  // Para obtener el id de la ruta
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtenemos el id desde la URL utilizando ActivatedRoute
    const subjectId = this.route.snapshot.paramMap.get('id');
    if (subjectId) {
      // Obtenemos la materia utilizando el servicio
      this.subjectService.getSubjectById(subjectId).subscribe(
        (data) => {
          this.subject = data;  // Asignamos la materia obtenida a la variable subject
        },
        (error) => {
          console.error('Error al cargar la materia', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.subject) {
      // Obtenemos el id desde la URL nuevamente para actualizar la materia
      const subjectId = this.route.snapshot.paramMap.get('id');
      if (subjectId) {
        // Llamamos al servicio para actualizar la materia
        this.subjectService.updateSubject(subjectId, this.subject).subscribe(
          (response) => {
            this.updateMessage = 'Materia actualizada con éxito!';
            setTimeout(() => this.router.navigate(['/subject-list']), 1000);
          },
          (error) => {
            this.updateMessage = 'Hubo un error al actualizar la materia.';
            console.error('Error al actualizar materia', error);
          }
        );
      }
    }
  }
}
