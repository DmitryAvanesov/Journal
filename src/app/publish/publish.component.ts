import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';
import { IssueService } from '../services/issue.service';
import { SubmissionService } from '../services/submission.service';
import { IssueRes } from '../types/Issue';
import { Submission, SubAuthor } from '../types/Submission';
import { User } from '../types/User';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private submissionService: SubmissionService,
    private authenticationService: AuthenticationService,
    private issueService: IssueService
  ) {}

  formGroup: FormGroup;
  submissionsForPublishing: Submission[];
  authors: SubAuthor;

  submitPublishForm(): void {
    const issue = {
      number: this.formGroup.controls.numberControl.value,
      year: this.formGroup.controls.yearControl.value,
      submissions: this.submissionsForPublishing.map((value) => value.id),
    };

    this.issueService.publishIssue(issue).subscribe(
      (_res) => {
        console.log('Success');
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.authors = {};

    this.formGroup = new FormGroup({
      numberControl: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      yearControl: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(1900),
        Validators.max(new Date().getFullYear()),
      ]),
      coverControl: new FormControl(''),
      titleControl: new FormArray([]),
    });

    this.submissionService
      .getSubmissionsForPublishing()
      .subscribe((submissions: Submission[]) => {
        this.submissionsForPublishing = submissions;

        for (const submission of submissions) {
          (this.formGroup.controls.titleControl as FormArray).push(
            new FormControl('', Validators.required)
          );

          this.authenticationService.getName(submission.user).subscribe(
            (user: User) => {
              this.authors = {
                ...this.authors,
                [submission.id]: user,
              };
            },
            (err: Error) => {
              console.log(err);
            }
          );
        }
      });

    this.iconRegistry.addSvgIcon(
      'attach',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/attach.svg')
    );
  }
}
