import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  user: User | undefined;

  ngOnInit(): void {
    this.authenticationService.user.subscribe((user: User | undefined) => {
      this.user = user;
    });

    this.iconRegistry.addSvgIcon(
      'download',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/download.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'tick',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/tick.svg')
    );
  }
}
