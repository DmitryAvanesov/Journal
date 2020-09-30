import { Component, OnInit } from '@angular/core';
import {
  ICON_REGISTRY_PROVIDER,
  MatIconRegistry,
} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';
import { User, UserReqRes } from '../types/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  user: User | undefined;

  signOut(): void {
    this.authenticationService.signOut();
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe((user: User | undefined) => {
      this.user = user;
    });

    this.iconRegistry.addSvgIcon(
      'profile',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/profile.svg')
    );
  }
}
