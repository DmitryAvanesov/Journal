import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { SubmissionService } from '../services/submission.service';
import { SubFile, Submission } from '../types/Submission';
import { User } from '../types/User';
import * as FileSaver from 'file-saver';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from '../services/image.service';
import { Res } from '../types/Res';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private submissionService: SubmissionService,
    private imageService: ImageService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  user: User | undefined;
  image: SafeUrl | undefined;
  submissions: Submission[];

  downloadSubmissionFile(subFile: SubFile): void {
    this.submissionService.downloadFile(subFile).subscribe(
      (res: ArrayBuffer) => {
        const blob = new Blob([res], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, subFile.name);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  uploadImage(image: File): void {
    console.log(image);

    this.imageService.uploadImage(image).subscribe(
      (res) => {},
      (err: Error) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe((user: User | undefined) => {
      this.user = user;
    });

    this.imageService.downloadImage().subscribe((image: Res) => {
      console.log(image);
      const base64String = btoa(
        new Uint8Array(image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      this.image = this.sanitizer.bypassSecurityTrustUrl(
        `data:image/jpeg;base64,${base64String}`
      );
    });

    this.submissionService.getSubmissions().subscribe((res: Submission[]) => {
      this.submissions = res;
    });

    this.iconRegistry.addSvgIcon(
      'download',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/download.svg')
    );
  }
}
