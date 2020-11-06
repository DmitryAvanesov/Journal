import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { UserReqRes } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class PublishGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authenticationService.getCurrent().pipe(
      switchMap((res: UserReqRes) => {
        if (
          !res ||
          (res && res.user.role !== 'editor' && res.user.role !== 'admin')
        ) {
          this.router.navigate(['profile']);
          return of(false);
        }

        return of(true);
      }),
      catchError(() => {
        this.router.navigate(['profile']);
        return of(false);
      })
    );
  }
}
