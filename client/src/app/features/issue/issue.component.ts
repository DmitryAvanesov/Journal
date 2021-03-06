import * as FileSaver from 'file-saver';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/core/services/image.service';
import { SubmissionService } from 'src/app/core/services/submission.service';
import { Res } from 'src/app/core/types/Res';
import { SubFile, Submission } from 'src/app/core/types/Submission';
import { MatIconRegistry } from '@angular/material/icon';

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
    private sanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry
  ) {}

  submission: Submission;
  image: string;
  text: string;

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

  downloadSubmissionFile(subFile: SubFile): void {
    this.submissionService.downloadFile(subFile).subscribe(
      (res: ArrayBuffer) => {
        const blob = new Blob([res], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, subFile.name);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  renderSubmissionFile(subFile: SubFile): void {
    this.submissionService.downloadFile(subFile).subscribe(
      (res: ArrayBuffer) => {
        const blob = new Blob([res], { type: 'text/plain;charset=utf-8' });

        blob.text().then((value) => {
          let text = value.split(' ');

          for (let i = text.length - 1; i >= 0; i--) {
            if (/^[a-zA-Z]+\./.test(text[i])) {
              text = text.slice(0, i + 1);
              break;
            }
          }

          text[0] = text[0].slice(
            text[0].lastIndexOf(text[0].match(/[A-Z]/g).pop())
          );
          text[text.length - 1] = text[text.length - 1].slice(
            0,
            text[text.length - 1].indexOf('.') + 1
          );

          this.text = text.join(' ');
        });
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
            this.submission = res;
            this.downloadImage();
            this.renderSubmissionFile({
              submission: res.number,
              name: this.submission.about,
            });
          },
          (err: Error) => {
            console.log(err);
          }
        );
    });

    this.iconRegistry.addSvgIcon(
      'download',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '../../../assets/download.svg'
      )
    );
  }
}
