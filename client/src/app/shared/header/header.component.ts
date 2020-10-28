import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User, UserReqRes } from 'src/app/core/types/User';

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
    this.authenticationService.getCurrent().subscribe((res: UserReqRes) => {
      this.user = res.user;
    });

    this.iconRegistry.addSvgIcon(
      'dropdown',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/dropdown.svg')
    );
  }
}
