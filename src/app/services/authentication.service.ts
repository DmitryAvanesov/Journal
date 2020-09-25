import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private router: Router) {
    this.onInit();
  }

  private url = 'http://localhost:3000/api/user';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  isAuthorized: boolean;

  onInit(): void {
    this.getCurrent().subscribe(
      (_res: User) => {
        this.isAuthorized = true;
      },
      (_err: Error) => {
        this.isAuthorized = false;
      }
    );
  }

  signUp(user: User): Observable<User> {
    return this.httpClient
      .post<User>(`${this.url}/sign-up/`, user, this.httpOptions)
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err.error.errors));
        })
      );
  }

  logIn(user: User): Observable<User> {
    return this.httpClient
      .post<User>(`${this.url}/log-in/`, user, this.httpOptions)
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err.error.errors));
        }),
        tap((res: User) => {
          localStorage.setItem('journal-token', res.user.token);
        })
      );
  }

  getCurrent(): Observable<User> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('journal-token')}`,
      }),
    };

    return this.httpClient
      .get<User>(`${this.url}/current/`, httpOptionsWithToken)
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err.error.errors));
        })
      );
  }

  signOut(): void {
    this.isAuthorized = false;
    localStorage.removeItem('journal-token');
    this.router.navigate(['/log-in']);
  }
}
