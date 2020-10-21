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
import { UserReqRes } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      this.authenticationService.getCurrent().subscribe(
        (res: UserReqRes | undefined) => {
          if (res) {
            return resolve(true);
          }

          this.router.navigate(['log-in']);
          return resolve(false);
        },
        (_err: Error) => {
          this.router.navigate(['log-in']);
          return resolve(false);
        }
      );
    });
  }
}
