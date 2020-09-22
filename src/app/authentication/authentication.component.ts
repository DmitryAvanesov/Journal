import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../types/User';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService) {}

  passwordIsHidden: boolean;
  private a: User;

  switchPasswordHiding(): void {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  submitSignUpForm(username: string, password: string): void {
    this.authenticationService.signUp(username, password).subscribe((user) => {
      this.a = user;
      console.log(this.a);
    });
  }

  ngOnInit(): void {
    this.passwordIsHidden = true;
  }
}
