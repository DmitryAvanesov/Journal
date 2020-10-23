import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authenticationService.getCurrent().subscribe(
        (res: UserReqRes | undefined) => {
          if (res) {
            return resolve(true);
          }

          this.router.navigate(['log-in']);
          return resolve(false);
        },
        () => {
          this.router.navigate(['log-in']);
          return resolve(false);
        }
      );
    });
  }
}
