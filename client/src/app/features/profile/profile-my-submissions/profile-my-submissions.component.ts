import * as FileSaver from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { SubmissionService } from 'src/app/core/services/submission.service';
import { SubFile, Submission } from 'src/app/core/types/Submission';

@Component({
  selector: 'app-profile-my-submissions',
  templateUrl: './profile-my-submissions.component.html',
  styleUrls: ['./profile-my-submissions.component.scss'],
})
export class ProfileMySubmissionsComponent implements OnInit {
  constructor(private submissionService: SubmissionService) {}

  submissions: Submission[];

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

  ngOnInit(): void {
    this.submissionService.getSubmissions().subscribe((res: Submission[]) => {
      this.submissions = res.reverse();
    });
  }
}
