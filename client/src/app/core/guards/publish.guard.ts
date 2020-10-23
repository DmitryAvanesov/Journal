import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authenticationService.user.subscribe(
        (res: User | undefined) => {
          if (res && res.role !== 'editor' && res.role !== 'admin') {
            this.router.navigate(['profile']);
            return resolve(false);
          }

          return resolve(true);
        },
        () => {
          this.router.navigate(['profile']);
          return resolve(false);
        }
      );
    });
  }
}
