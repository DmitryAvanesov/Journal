import * as FileSaver from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { SubmissionService } from 'src/app/core/services/submission.service';
import { SubFile, Submission } from 'src/app/core/types/Submission';

@Component({
  selector: 'app-profile-submissions-for-editing',
  templateUrl: './profile-submissions-for-editing.component.html',
  styleUrls: ['./profile-submissions-for-editing.component.scss'],
})
export class ProfileSubmissionsForEditingComponent implements OnInit {
  constructor(private submissionService: SubmissionService) {}

  submissionsForEditing: Submission[];

  scheduleSubmission(id: string, reverse: boolean): void {
    this.submissionService.scheduleSubmission(id, reverse).subscribe(
      (res: Submission) => {
        this.submissionsForEditing = [
          ...this.submissionsForEditing.filter(
            (_value, index) =>
              index <
              this.submissionsForEditing
                .map((value) => value.id)
                .indexOf(res.id)
          ),
          res,
          ...this.submissionsForEditing.filter(
            (_value, index) =>
              index >
              this.submissionsForEditing
                .map((value) => value.id)
                .indexOf(res.id)
          ),
        ];
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

  ngOnInit(): void {
    this.submissionService
      .getSubmissionsForEditing()
      .subscribe((res: Submission[]) => {
        this.submissionsForEditing = res;
      });
  }
}
