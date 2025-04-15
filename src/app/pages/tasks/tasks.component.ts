import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  newTask = { title: '', description: '', completed: false };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Cargar tareas cuando el componente se inicialice
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error al cargar tareas:', err);
        alert('No se pudieron cargar las tareas.');
      }
    });
  }

  createTask(): void {
    if (!this.newTask.title.trim()) return; // Si no hay título, no hacer nada

    this.taskService.createTask(this.newTask).subscribe({
      next: (task) => {
        this.tasks.push(task);  // Agregar la tarea creada a la lista
        this.newTask = { title: '', description: '', completed: false }; // Limpiar formulario
      },
      error: (err) => {
        console.error('Error al crear tarea:', err);
        alert('No se pudo crear la tarea.');
      }
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task._id !== id); // Eliminar la tarea de la lista
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
        alert('No se pudo eliminar la tarea.');
      }
    });
  }

  toggleCompletion(task: any): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task._id, { completed: task.completed }).subscribe({
      next: () => {
        console.log('Tarea actualizada');
      },
      error: (err) => {
        console.error('Error al actualizar tarea:', err);
        alert('No se pudo actualizar la tarea.');
      }
    });
  }
}
