import { NgxMatFileInputComponent } from '@angular-material-components/file-input';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/file-upload/file-uploader.class';
import { SubmissionService } from '../services/submission.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
})
export class SubmissionComponent implements OnInit {
  constructor(public submissionService: SubmissionService) {}

  formGroup: FormGroup;

  submitSubmissionForm(
    manuscript,
    about
    // agreement: File,
    // anonymous: File
  ): void {
    console.log(manuscript);

    this.submissionService.makeSubmission(manuscript).subscribe(
      (res) => {
        console.log(res);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      manuscriptControl: new FormControl('', [Validators.required]),
      aboutControl: new FormControl(''),
      agreementControl: new FormControl(''),
      anonymousControl: new FormControl(''),
    });
  }
}
