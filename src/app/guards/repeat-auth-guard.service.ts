import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User, UserReqRes } from '../types/User';
import { AuthenticationService } from '../services/authentication.service';

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
