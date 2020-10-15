import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class RepeatAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      this.authenticationService.user.subscribe(
        (res: User | undefined) => {
          if (res) {
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
