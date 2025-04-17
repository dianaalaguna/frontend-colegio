// src/app/models/student.model.ts

export interface Student {
  _id?: string; // Opcional para creación
  codigoEstudiante: string;
  nombres: string;
  apellidos: string;
  correoTutor: string;
  nacimiento: Date;
  estado: boolean;
}
