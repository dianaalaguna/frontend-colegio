import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserType {
  _id: string;
  number: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {
  //private apiUrl = 'http://localhost:5000/api/userType';
  private baseUrl = `${environment.apiUrl}/userType`;
  constructor(private http: HttpClient) {}

  getUserTypes(): Observable<UserType[]> {
    return this.http.get<UserType[]>(this.baseUrl);
  }
}
