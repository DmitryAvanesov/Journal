import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
})
export class SubmissionComponent implements OnInit {
  constructor() {}

  formGroup: FormGroup;

  submitSubmissionForm(): void {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      manuscriptControl: new FormControl('', [Validators.required]),
      aboutControl: new FormControl('', [Validators.required]),
      agreementControl: new FormControl('', [Validators.required]),
      anonymousControl: new FormControl('', [Validators.required]),
    });
  }
}
