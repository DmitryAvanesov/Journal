import { Component, OnInit, SecurityContext } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { SubmissionService } from '../services/submission.service';
import { SubFile, Submission } from '../types/Submission';
import { User } from '../types/User';
import * as FileSaver from 'file-saver';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from '../services/image.service';
import { Res } from '../types/Res';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';

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
    private sanitizer: DomSanitizer,
    private router: Router,
    private dialog: MatDialog
  ) {}

  user: User | undefined;
  image: string;
  submissions: Submission[];
  submissionsForReview: Submission[];
  submissionsForEditing: Submission[];

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

  reviewSubmission(id: string, status: string): void {
    this.submissionService.reviewSubmission({ id, status }).subscribe(
      (res: Submission) => {
        this.submissionsForReview = [
          res,
          ...this.submissionsForReview.filter((value) => value.id !== id),
        ];
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  uploadImage(image: File): void {
    this.imageService.uploadImage(image).subscribe(
      (_res) => {
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
      (_res) => {
        this.downloadImage();
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  openDialog(): void {
    this.dialog.open(DialogDeleteUserComponent);
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe((user: User | undefined) => {
      this.user = user;
    });

    this.downloadImage();

    this.submissionService.getSubmissions().subscribe((res: Submission[]) => {
      this.submissions = res.reverse();
    });

    this.submissionService
      .getSubmissionsForReview()
      .subscribe((res: Submission[]) => {
        this.submissionsForReview = res.reverse();
      });

    this.submissionService
      .getSubmissionsForEditing()
      .subscribe((res: Submission[]) => {
        this.submissionsForEditing = res;
      });

    this.iconRegistry.addSvgIcon(
      'download',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/download.svg')
    );
    this.iconRegistry.addSvgIcon(
      'edit',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/edit.svg')
    );
    this.iconRegistry.addSvgIcon(
      'delete',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/delete.svg')
    );
  }
}
