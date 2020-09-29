import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../types/User';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  userData: User;

  signOut(): void {
    this.authenticationService.signOut();
  }

  ngOnInit(): void {
    this.authenticationService.getCurrent().subscribe((newUser: User) => {
      this.userData = newUser;
    });
  }
}
