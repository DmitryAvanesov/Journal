import { Component, OnInit } from '@angular/core';
import { IssueService } from '../services/issue.service';
import { IssueRes } from '../types/Issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  constructor(private issueService: IssueService) {}

  issues: IssueRes[];

  ngOnInit(): void {
    this.issueService.getIssues().subscribe(
      (res: IssueRes[]) => {
        this.issues = res;
        console.log(this.issues);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }
}
