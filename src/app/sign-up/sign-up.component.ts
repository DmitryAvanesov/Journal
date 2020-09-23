import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  passwordIsHidden: boolean;
  confirmPasswordIsHidden: boolean;

  switchPasswordHiding(): void {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  switchConfirmPasswordHiding(): void {
    this.confirmPasswordIsHidden = !this.confirmPasswordIsHidden;
  }

  submitSignUpForm(
    username: string,
    password: string,
    confirmPassword: string
  ): void {
    this.authenticationService
      .signUp({
        user: {
          username,
          password,
          confirmPassword,
        },
      })
      .subscribe((user) => {
        console.log(user);
      });
  }

  ngOnInit(): void {
    this.passwordIsHidden = true;
    this.confirmPasswordIsHidden = true;
  }
}
