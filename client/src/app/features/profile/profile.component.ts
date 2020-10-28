import * as FileSaver from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SubmissionService } from 'src/app/core/services/submission.service';
import { Submission, SubFile } from 'src/app/core/types/Submission';
import { User, UserReqRes } from 'src/app/core/types/User';
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

  openDialog(): void {
    this.dialog.open(DialogDeleteUserComponent);
  }

  ngOnInit(): void {
    this.authenticationService.getCurrent().subscribe((res: UserReqRes) => {
      this.user = res.user;

      if (res) {
        if (res.user.role === 'reviewer') {
          this.submissionService
            .getSubmissionsForReview()
            .subscribe((res: Submission[]) => {
              this.submissionsForReview = res.reverse();
            });
        }

        if (res.user.role === 'editor') {
          this.submissionService
            .getSubmissionsForEditing()
            .subscribe((res: Submission[]) => {
              this.submissionsForEditing = res;
            });
        }
      }
    });

    this.submissionService.getSubmissions().subscribe((res: Submission[]) => {
      this.submissions = res.reverse();
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
