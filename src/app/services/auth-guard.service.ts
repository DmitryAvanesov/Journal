import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
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
    return new Promise((resolve, _reject) => {
      this.authenticationService.getCurrent().subscribe(
        (res: User) => {
          console.log(res);
          return resolve(true);
        },
        (err: Error) => {
          console.log(err.message);
          this.router.navigate(['log-in']);
          return resolve(false);
        }
      );
    });
  }
}
