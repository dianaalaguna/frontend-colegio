// src/app/services/user-type.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserType {
  number: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  private apiUrl = 'http://localhost:5000/api/userType';

  constructor(private http: HttpClient) {}

  getUserTypes(): Observable<UserType[]> {
    return this.http.get<UserType[]>(this.apiUrl);
  }
}
