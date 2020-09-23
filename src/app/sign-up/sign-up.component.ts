import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../types/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  passwordIsHidden: boolean;
  confirmPasswordIsHidden: boolean;
  formGroup: FormGroup;
  passwordGroup: FormGroup;

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
        console.log(control);
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
        user: {
          username,
          password,
          confirmPassword,
        },
      })
      .subscribe(
        (res: User) => {
          console.log(res);
        },
        (err: Error) => {
          const error = JSON.parse(err.message);
          console.log(error);
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
  }
}
