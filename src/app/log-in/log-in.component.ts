import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  passwordIsHidden: boolean;

  switchPasswordHiding(): void {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  submitLogInForm(username: string, password: string): void {}

  ngOnInit(): void {
    this.passwordIsHidden = true;
  }
}
