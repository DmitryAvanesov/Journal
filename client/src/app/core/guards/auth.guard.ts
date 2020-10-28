import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { UserReqRes } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authenticationService.getCurrent().pipe(
      switchMap((res) => {
        if (res) {
          return of(true);
        }

        this.router.navigate(['log-in']);
        return of(false);
      }),
      catchError(() => {
        this.router.navigate(['log-in']);
        return of(false);
      })
    );
  }
}
