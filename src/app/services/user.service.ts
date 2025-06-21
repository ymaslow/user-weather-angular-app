import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(count: number = 6) {
    return this.http.get<any>(`https://randomuser.me/api/?results=${count}`);
  }
}