import { Component, OnInit, SecurityContext } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/core/services/image.service';
import { SubmissionService } from 'src/app/core/services/submission.service';
import { Res } from 'src/app/core/types/Res';
import { Submission } from 'src/app/core/types/Submission';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    private imageService: ImageService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  submission: Submission;
  image: string;

  downloadImage(): void {
    this.imageService.downloadImageById(this.submission.author.id).subscribe(
      (res: Res) => {
        const base64String = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        this.image = this.sanitizer.sanitize(
          SecurityContext.RESOURCE_URL,
          this.sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/jpeg;base64,${base64String}`
          )
        );
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.submissionService
        .getSubmissionByNumber(params.issueNumber)
        .subscribe(
          (res: Submission) => {
            console.log(res);
            this.submission = res;
          },
          (err: Error) => {
            console.log(err);
          }
        );
    });
  }
}
