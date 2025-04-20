import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { SubjectService } from '../../services/subject.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-asignar-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignar-estudiantes.component.html',
  styleUrls: ['./asignar-estudiantes.component.css']
})
export class AsignarEstudiantesComponent implements OnInit {
  subjectId!: string;
  unassignedStudents: Student[] = [];
  selectedStudentIds: Set<string> = new Set();

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.paramMap.get('id')!;
    this.loadUnassignedStudents();
  }

  loadUnassignedStudents(): void {
    this.studentService.getStudentsNotAssigned(this.subjectId).subscribe((students) => {
      this.unassignedStudents = students;
      console.log('Estudiantes: ', this.unassignedStudents);
    });
  }

  onCheckboxChange(event: Event, studentId: string): void {
    const inputElement = event.target as HTMLInputElement;

    const checked = inputElement?.checked ?? false;

    if (checked) {
      this.selectedStudentIds.add(studentId);
    } else {
      this.selectedStudentIds.delete(studentId);
    }
  }

  asignarEstudiantes(): void {
    const studentIds = Array.from(this.selectedStudentIds);

    if (studentIds.length === 0) {
      alert('Por favor selecciona al menos un estudiante.');
      return;
    }

    studentIds.forEach(id => {
      this.subjectService.asociarEstudiante(this.subjectId, id).subscribe({
        next: () => {
          console.log(`Estudiante ${id} asignado`);
          this.loadUnassignedStudents(); // recarga después de cada asignación
        },
        error: (err) => {
          console.error(`Error al asignar estudiante ${id}`, err);
        }
      });
    });

    // Limpiar selección
    this.selectedStudentIds.clear();
  }
}
