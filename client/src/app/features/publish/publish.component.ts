import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { IssuesService } from 'src/app/core/services/issues.service';
import { SubmissionService } from 'src/app/core/services/submission.service';
import { IssueReq } from 'src/app/core/types/Issue';
import { Submission, SubAuthor } from 'src/app/core/types/Submission';
import { User } from 'src/app/core/types/User';

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
    private issueService: IssuesService,
    private router: Router
  ) {}

  formGroup: FormGroup;
  submissionsForPublishing: Submission[];
  authors: SubAuthor;

  submitPublishForm(): void {
    const issue: IssueReq = {
      number: this.formGroup.controls.numberControl.value,
      year: this.formGroup.controls.yearControl.value,
      cover: this.formGroup.controls.coverControl.value.files[0],
      submissions: this.submissionsForPublishing.map((value, index) => ({
        id: value.id,
        title: this.formGroup.controls.titleControl.value[index],
      })),
    };

    this.issueService.publishIssue(issue).subscribe(
      () => {
        this.router.navigate(['/issues']);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.submissionsForPublishing = [];
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
