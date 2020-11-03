import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubmissionService } from 'src/app/core/services/submission.service';
import { Submission } from 'src/app/core/types/Submission';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService
  ) {}

  submission: Submission;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);

      this.submissionService
        .getSubmissionByNumber(params.issueNumber)
        .subscribe(
          (res: Submission) => {
            this.submission = res;
          },
          (err: Error) => {
            console.log(err);
          }
        );
    });
  }
}
