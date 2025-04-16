// src/app/models/user.model.ts

export interface UserType {
  _id: string;
  number: number;
  type: string;
}

export interface User {
  _id?: string; // Opcional para creación
  username: string;
  password?: string; // Puede omitirse en edición
  nombres: string;
  apellidos: string;
  telefono: string;
  estado: boolean;
  tipoUsuario: UserType | string; // Puede ser el ID o el objeto completo
}
