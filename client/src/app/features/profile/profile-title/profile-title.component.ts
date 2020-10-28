import { Component, OnInit, SecurityContext } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ImageService } from 'src/app/core/services/image.service';
import { Res } from 'src/app/core/types/Res';
import { User, UserReqRes } from 'src/app/core/types/User';

@Component({
  selector: 'app-profile-title',
  templateUrl: './profile-title.component.html',
  styleUrls: ['./profile-title.component.scss'],
})
export class ProfileTitleComponent implements OnInit {
  constructor(
    private imageService: ImageService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private authenticationService: AuthenticationService
  ) {}

  user: User | undefined;
  image: string;

  uploadImage(image: File): void {
    this.imageService.uploadImage(image).subscribe(
      () => {
        this.downloadImage();
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  downloadImage(): void {
    this.imageService.downloadImage().subscribe(
      (res: Res) => {
        const base64String = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        this.image = this.sanitizer.sanitize(
          SecurityContext.RESOURCE_URL,
          this.sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/jpeg;base64,${base64String}`
          )
        );
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  deleteImage(): void {
    this.imageService.deleteImage().subscribe(
      () => {
        this.downloadImage();
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.downloadImage();

    this.authenticationService.user.subscribe((user: User | undefined) => {
      this.user = user;
    });

    this.iconRegistry.addSvgIcon(
      'edit',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/edit.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'delete',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/delete.svg'
      )
    );
  }
}
