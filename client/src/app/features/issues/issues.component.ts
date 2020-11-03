import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IssuesService } from 'src/app/core/services/issues.service';
import { IssueRes } from 'src/app/core/types/Issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  constructor(
    private issueService: IssuesService,
    private sanitizer: DomSanitizer
  ) {}

  issues: IssueRes[];

  ngOnInit(): void {
    this.issueService.getIssues().subscribe(
      (res: IssueRes[]) => {
        for (const issue of res) {
          const base64String = btoa(
            new Uint8Array(issue.cover.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          issue.image = this.sanitizer.sanitize(
            SecurityContext.RESOURCE_URL,
            this.sanitizer.bypassSecurityTrustResourceUrl(
              `data:image/jpeg;base64,${base64String}`
            )
          );
        }

        this.issues = res.reverse();
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }
}
