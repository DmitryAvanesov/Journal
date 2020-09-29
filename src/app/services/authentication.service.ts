import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, UserReqRes } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private router: Router) {}

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

  logIn(user: User): Observable<UserReqRes> {
    return this.httpClient
      .post<UserReqRes>(`${this.url}/log-in/`, { user }, this.httpOptions)
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err.error.errors));
        }),
        tap((res: UserReqRes) => {
          localStorage.setItem('journal-token', res.user.token);
        })
      );
  }

  getCurrent(): Observable<UserReqRes> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('journal-token')}`,
      }),
    };

    return this.httpClient
      .get<UserReqRes>(`${this.url}/current/`, httpOptionsWithToken)
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err.error.errors));
        })
      );
  }

  signOut(): void {
    localStorage.removeItem('journal-token');
    this.router.navigate(['/log-in']);
  }
}
