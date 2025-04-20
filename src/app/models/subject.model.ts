// src/app/models/subject.model.ts
export interface Subject {
  _id?: string;
  nombre: string;
  grado: string;
  periodo: number;
  estado?: boolean;
  profesores?: string[];
  estudiantes?: string[];
}
