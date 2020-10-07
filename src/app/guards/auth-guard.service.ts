import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User, UserReqRes } from '../types/User';
import { AuthenticationService } from '../services/authentication.service';
import { last, skip } from 'rxjs/operators';

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
    return new Promise((resolve, _reject) => {
      this.authenticationService.user.subscribe(
        (res: User | undefined) => {
          return resolve(true);
        },
        (err: Error) => {
          this.router.navigate(['log-in']);
          return resolve(false);
        }
      );
    });
  }
}
