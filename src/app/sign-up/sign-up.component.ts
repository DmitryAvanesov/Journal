import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User, UserReqRes } from '../types/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  passwordIsHidden: boolean;
  confirmPasswordIsHidden: boolean;
  formGroup: FormGroup;
  passwordGroup: FormGroup;
  usernameIsUsed: boolean;

  switchPasswordHiding(): void {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  switchConfirmPasswordHiding(): void {
    this.confirmPasswordIsHidden = !this.confirmPasswordIsHidden;
  }

  passwordsEqualityValidator(): (
    control: AbstractControl
  ) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        control.value.passwordControl !== control.value.confirmPasswordControl
      ) {
        return { notEqual: true };
      }

      return null;
    };
  }

  submitSignUpForm(
    username: string,
    password: string,
    confirmPassword: string
  ): void {
    this.authenticationService
      .signUp({
        username,
        password,
        confirmPassword,
      })
      .subscribe(
        (res: UserReqRes) => {
          this.usernameIsUsed = false;
          this.router.navigate(['log-in']);
        },
        (err: Error) => {
          if (JSON.parse(err.message).username === 'is already used') {
            this.usernameIsUsed = true;
          }
        }
      );
  }

  ngOnInit(): void {
    this.passwordIsHidden = true;
    this.confirmPasswordIsHidden = true;
    this.formGroup = new FormGroup({
      usernameControl: new FormControl('', [Validators.required]),
      passwordGroup: new FormGroup({
        passwordControl: new FormControl('', [Validators.required]),
        confirmPasswordControl: new FormControl('', [Validators.required]),
      }),
    });
    this.passwordGroup = this.formGroup.get('passwordGroup') as FormGroup;
    this.passwordGroup.setValidators(this.passwordsEqualityValidator());
    this.usernameIsUsed = false;
  }
}
