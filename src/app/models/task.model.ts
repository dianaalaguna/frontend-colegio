// src/app/models/task.model.ts

export interface Task {
  _id?: string;  // opcional para cuando se crea una nueva tarea
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
