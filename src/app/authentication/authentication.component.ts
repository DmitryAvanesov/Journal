import { Component, OnInit } from '@angular/core';

interface ISignUpData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor() {}

  passwordIsHidden = true;
  signUpData: ISignUpData = {
    username: '',
    password: '',
  };

  switchPasswordHiding(): void {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  ngOnInit(): void {}
}
