import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { UserReqRes } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class RepeatAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authenticationService.getCurrent().pipe(
      switchMap((res: UserReqRes) => {
        if (res) {
          this.router.navigate(['home']);
          return of(false);
        }

        return of(true);
      }),
      catchError(() => {
        return of(true);
      })
    );
  }
}
