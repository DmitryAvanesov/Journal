import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User, UserReqRes } from '../types/User';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  user: User;

  signOut(): void {
    this.authenticationService.signOut();
  }

  ngOnInit(): void {
    this.authenticationService.getCurrent().subscribe((newUser: UserReqRes) => {
      this.user = newUser.user;
    });
  }
}
