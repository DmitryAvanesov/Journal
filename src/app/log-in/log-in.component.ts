import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../types/User';

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

  passwordIsHidden: boolean;
  formGroup: FormGroup;

  switchPasswordHiding(): void {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  submitLogInForm(username: string, password: string): void {
    this.authenticationService.logIn({
      user: {
        username,
        password,
      },
    });
  }

  ngOnInit(): void {
    this.passwordIsHidden = true;
    this.formGroup = new FormGroup({
      usernameControl: new FormControl('', [Validators.required]),
      passwordControl: new FormControl('', [Validators.required]),
    });

    this.authenticationService.getUser().subscribe((res: User | undefined) => {
      console.log(res);
      if (res) {
        this.router.navigate(['test']);
      }
    });
  }
}
