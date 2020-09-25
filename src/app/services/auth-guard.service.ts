import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '../types/User';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean> {
    if (this.authenticationService.isAuthorized) {
      return new Promise((resolve, _reject) => {
        return resolve(true);
      });
    }

    return new Promise((resolve, _reject) => {
      this.authenticationService.getCurrent().subscribe(
        (_res: User) => {
          return resolve(true);
        },
        (_err: Error) => {
          this.router.navigate(['log-in']);
          return resolve(false);
        }
      );
    });
  }
}
