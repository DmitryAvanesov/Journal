import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  dataIsIncorrect: boolean;
  passwordIsHidden: boolean;
  formGroup: FormGroup;

  switchPasswordHiding(): void {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  submitLogInForm(): void {
    const username = this.formGroup.get('usernameControl').value;
    const password = this.formGroup.get('passwordControl').value;

    this.authenticationService
      .logIn({
        username,
        password,
      })
      .subscribe(
        () => {
          this.dataIsIncorrect = false;
          this.router.navigate(['home']);
        },
        (err: Error) => {
          this.dataIsIncorrect = true;
          console.log(err);
        }
      );
  }

  ngOnInit(): void {
    this.dataIsIncorrect = false;
    this.passwordIsHidden = true;
    this.formGroup = new FormGroup({
      usernameControl: new FormControl('', [Validators.required]),
      passwordControl: new FormControl('', [Validators.required]),
    });
  }
}
