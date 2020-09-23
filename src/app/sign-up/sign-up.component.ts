import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService) {}

  passwordIsHidden: boolean;

  switchPasswordHiding(): void {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  submitSignUpForm(username: string, password: string): void {
    this.authenticationService
      .signUp({
        user: {
          username,
          password,
        },
      })
      .subscribe();
  }

  ngOnInit(): void {
    this.passwordIsHidden = true;
  }
}
