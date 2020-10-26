import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/types/User';

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

  user: User | undefined;
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

  submitSignUpForm(): void {
    const username = this.formGroup.get('usernameControl').value;
    const password = this.formGroup.get('passwordGroup').get('passwordControl')
      .value;
    const confirmPassword = this.formGroup
      .get('passwordGroup')
      .get('confirmPasswordControl').value;
    const role = this.formGroup.get('roleControl').value;

    this.authenticationService
      .signUp({
        username,
        password,
        confirmPassword,
        role,
      })
      .subscribe(
        () => {
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
    this.authenticationService.user.subscribe((user: User | undefined) => {
      this.user = user;
    });

    this.passwordIsHidden = true;
    this.confirmPasswordIsHidden = true;
    this.formGroup = new FormGroup({
      usernameControl: new FormControl('', [Validators.required]),
      passwordGroup: new FormGroup({
        passwordControl: new FormControl('', [Validators.required]),
        confirmPasswordControl: new FormControl('', [Validators.required]),
      }),
      roleControl: new FormControl('user', [Validators.required]),
    });
    this.passwordGroup = this.formGroup.get('passwordGroup') as FormGroup;
    this.passwordGroup.setValidators(this.passwordsEqualityValidator());
    this.usernameIsUsed = false;
  }
}
