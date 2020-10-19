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
export class PublishGuard implements CanActivate {
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
          if (res && res.role !== 'editor' && res.role !== 'admin') {
            this.router.navigate(['profile']);
            return resolve(false);
          }

          return resolve(true);
        },
        (_err: Error) => {
          this.router.navigate(['profile']);
          return resolve(false);
        }
      );
    });
  }
}
