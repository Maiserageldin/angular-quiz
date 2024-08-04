import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) {}

  getUsers(
    page: number,
    pageSize: number
  ): Observable<{ data: User[]; total: number }> {
    return this.http.get<{ data: User[]; total: number }>(
      `${this.apiUrl}?page=${page}&size=${pageSize}`
    );
  }

  getUser(id: number): Observable<{ data: User }> {
    return this.http.get<{ data: User }>(`${this.apiUrl}/${id}`);
  }
}
