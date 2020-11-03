import { Component, OnInit } from '@angular/core';
import { SubmissionService } from 'src/app/core/services/submission.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  constructor(private submissionService: SubmissionService) {}

  ngOnInit(): void {
    console.log('INIT');
  }
}
