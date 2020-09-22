import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  private url = 'http://localhost:3000/api';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  signUp(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${this.url}/user`,
      user,
      this.httpOptions
    );
  }
}
