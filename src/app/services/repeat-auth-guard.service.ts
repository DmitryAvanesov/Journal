import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../types/User';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RepeatAuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      this.authenticationService.getCurrent().subscribe(
        (_res: User) => {
          this.router.navigate(['test']);
          return resolve(false);
        },
        (_err: Error) => {
          return resolve(true);
        }
      );
    });
  }
}
