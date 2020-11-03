import * as FileSaver from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { SubmissionService } from 'src/app/core/services/submission.service';
import { SubFile, Submission } from 'src/app/core/types/Submission';

@Component({
  selector: 'app-profile-submissions-for-review',
  templateUrl: './profile-submissions-for-review.component.html',
  styleUrls: ['./profile-submissions-for-review.component.scss'],
})
export class ProfileSubmissionsForReviewComponent implements OnInit {
  constructor(private submissionService: SubmissionService) {}

  submissionsForReview: Submission[];

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

  ngOnInit(): void {
    this.submissionService
      .getSubmissionsForReview()
      .subscribe((res: Submission[]) => {
        this.submissionsForReview = res.reverse();
      });
  }
}
