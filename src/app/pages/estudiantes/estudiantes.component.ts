import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service'; // Asegúrate de tener el servicio para la API
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css'],
})
export class EstudiantesComponent implements OnInit {
  estudiante: any = {
    codigoEstudiante: '',
    nombres: '',
    apellidos: '',
    correoTutor: '',
    nacimiento: '',
  };
  //  isEditMode: boolean = false;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Verificar si estamos en modo edición (comprobando si hay un código de estudiante en la URL)
    this.route.params.subscribe((params) => {
      if (params['codigoEstudiante']) {
        //      this.isEditMode = true;
        this.loadEstudiante(params['codigoEstudiante']);
      }
    });
  }

  loadEstudiante(codigoEstudiante: string): void {
    // Si estamos en modo edición, cargamos los datos del estudiante
    this.studentService.getStudentByCode(codigoEstudiante).subscribe({
      next: (data) => {
        this.estudiante = data;
      },
      error: (err) => {
        console.error('Error al cargar estudiante', err);
      },
    });
  }

  submitForm(): void {
    /*    if (this.isEditMode) {
          this.updateEstudiante();
        } else {*/
    this.createEstudiante();
    //   }
  }

  createEstudiante(): void {
    this.studentService.createStudent(this.estudiante).subscribe({
      next: (response) => {
        alert('✅ Estudiante creado exitosamente');
        // Limpiar los campos del formulario
        this.estudiante = {
          codigoEstudiante: '',
          nombres: '',
          apellidos: '',
          correoTutor: '',
          nacimiento: '',
        };
        //this.router.navigate(['/estudiantes']); // Redirigir a la lista de estudiantes después de crear
      },
      error: (err) => {
        console.error('Error al crear estudiante', err);
        alert('❌ Error al crear estudiante');
      },
    });
  }

  /*updateEstudiante(): void {
    this.studentService.updateStudent(this.estudiante).subscribe({
      next: (response) => {
        console.log('Estudiante actualizado');
        this.router.navigate(['/estudiantes']); // Redirigir a la lista de estudiantes después de editar
      },
      error: (err) => {
        console.error('Error al actualizar estudiante', err);
      },
    });
  }*/
}
