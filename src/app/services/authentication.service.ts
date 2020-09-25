import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
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
  private user: BehaviorSubject<User | undefined> = new BehaviorSubject(
    undefined
  );

  getUser(): BehaviorSubject<User> {
    return this.user;
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

  logIn(user: User): void {
    this.httpClient
      .post<User>(`${this.url}/log-in/`, user, this.httpOptions)
      .pipe(
        catchError((err) => {
          throw new Error(JSON.stringify(err.error.errors));
        })
      )
      .subscribe(
        (res: User) => {
          this.user.next(res);
        },
        (err: Error) => {
          console.log(err);
        }
      );
  }
}
