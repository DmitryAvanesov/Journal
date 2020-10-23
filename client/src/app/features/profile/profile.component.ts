import * as FileSaver from 'file-saver';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ImageService } from 'src/app/core/services/image.service';
import { SubmissionService } from 'src/app/core/services/submission.service';
import { Res } from 'src/app/core/types/Res';
import { Submission, SubFile } from 'src/app/core/types/Submission';
import { User } from 'src/app/core/types/User';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';

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
          ...this.submissionsForReview.filter(
            (_value, index) =>
              index <
              this.submissionsForReview.map((value) => value.id).indexOf(res.id)
          ),
          res,
          ...this.submissionsForReview.filter(
            (_value, index) =>
              index >
              this.submissionsForReview.map((value) => value.id).indexOf(res.id)
          ),
        ];
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  scheduleSubmission(id: string, reverse: boolean): void {
    this.submissionService.scheduleSubmission(id, reverse).subscribe(
      (res: Submission) => {
        this.submissionsForEditing = [
          ...this.submissionsForEditing.filter(
            (_value, index) =>
              index <
              this.submissionsForEditing
                .map((value) => value.id)
                .indexOf(res.id)
          ),
          res,
          ...this.submissionsForEditing.filter(
            (_value, index) =>
              index >
              this.submissionsForEditing
                .map((value) => value.id)
                .indexOf(res.id)
          ),
        ];
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

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

  openDialog(): void {
    this.dialog.open(DialogDeleteUserComponent);
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe((user: User | undefined) => {
      this.user = user;

      if (user) {
        if (user.role === 'reviewer') {
          this.submissionService
            .getSubmissionsForReview()
            .subscribe((res: Submission[]) => {
              this.submissionsForReview = res.reverse();
            });
        }

        if (user.role === 'editor') {
          this.submissionService
            .getSubmissionsForEditing()
            .subscribe((res: Submission[]) => {
              this.submissionsForEditing = res;
            });
        }
      }
    });

    this.downloadImage();

    this.submissionService.getSubmissions().subscribe((res: Submission[]) => {
      this.submissions = res.reverse();
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
    this.iconRegistry.addSvgIcon(
      'tick',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/tick.svg')
    );
  }
}
