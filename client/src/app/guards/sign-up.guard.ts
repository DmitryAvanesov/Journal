import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class SignUpGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      this.authenticationService.user.subscribe(
        (res: User | undefined) => {
          if (res && res.role !== 'admin') {
            this.router.navigate(['home']);
            return resolve(false);
          }

          return resolve(true);
        },
        (_err: Error) => {
          return resolve(true);
        }
      );
    });
  }
}
