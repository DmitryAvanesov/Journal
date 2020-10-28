import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User, UserReqRes } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  private url = 'http://localhost:3000/api/user';

  signUp(user: User): Observable<UserReqRes> {
    return this.httpClient
      .post<UserReqRes>(`${this.url}/sign-up`, { user })
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err));
        })
      );
  }

  logIn(user: User): Observable<UserReqRes> {
    return this.httpClient
      .post<UserReqRes>(`${this.url}/log-in`, { user })
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err));
        }),
        tap((res: UserReqRes) => {
          localStorage.setItem('journal-token', res.user.token);
        })
      );
  }

  getCurrent(): Observable<UserReqRes> {
    return this.httpClient.get<UserReqRes>(`${this.url}/current`).pipe(
      catchError((err) => {
        throw new Error(JSON.stringify(err));
      })
    );
  }

  getName(id: string): Observable<User> {
    const params = new HttpParams().set('id', id);

    return this.httpClient
      .get<User>(`${this.url}/name`, { params })
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err));
        })
      );
  }

  deleteCurrent(): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/delete`).pipe(
      catchError((err) => {
        throw new Error(JSON.stringify(err));
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('journal-token');
    this.router.navigate(['/log-in']);
  }
}
