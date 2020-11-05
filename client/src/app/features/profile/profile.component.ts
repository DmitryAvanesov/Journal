import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  user: User | undefined;
  isOwner: boolean;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.authenticationService.user.subscribe((user: User | undefined) => {
        const { userId } = params;
        this.isOwner = user.id === userId;

        if (this.isOwner) {
          this.user = user;
        } else {
          this.authenticationService.getById(userId).subscribe(
            (res: User) => {
              this.user = res;
              console.log(res);
            },
            (err: Error) => {
              console.log(err);
            }
          );
        }
      });
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
