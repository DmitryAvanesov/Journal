import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) {}

  private url = 'http://localhost:3000/api/user';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  signUp(user: User): Observable<User> {
    return this.httpClient
      .post<User>(`${this.url}/sign-up/`, user, this.httpOptions)
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err.error.errors));
        })
      );
  }
}
