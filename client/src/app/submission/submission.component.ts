import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SubmissionService } from '../services/submission.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
})
export class SubmissionComponent implements OnInit {
  constructor(
    public submissionService: SubmissionService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  formGroup: FormGroup;

  submitSubmissionForm(
    manuscript: File,
    about: File,
    agreement: File,
    anonymous: File
  ): void {
    this.submissionService
      .makeSubmission(manuscript, about, agreement, anonymous)
      .subscribe(
        () => {
          this.router.navigate(['/profile']);
        },
        (err: Error) => {
          console.log(err);
        }
      );
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      manuscriptControl: new FormControl('', [Validators.required]),
      aboutControl: new FormControl('', [Validators.required]),
      agreementControl: new FormControl('', [Validators.required]),
      anonymousControl: new FormControl('', [Validators.required]),
    });

    this.iconRegistry.addSvgIcon(
      'attach',
      this.sanitizer.bypassSecurityTrustResourceUrl('../../assets/attach.svg')
    );
  }
}
