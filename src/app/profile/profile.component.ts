import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { SubmissionService } from '../services/submission.service';
import { SubFile, Submission } from '../types/Submission';
import { User } from '../types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private submissionService: SubmissionService
  ) {}

  user: User | undefined;
  submissions: Submission[];

  download(subFile: SubFile): void {
    this.submissionService.downloadFile(subFile).subscribe(
      (_res) => {},
      (err: Error) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe((user: User | undefined) => {
      this.user = user;
    });

    this.submissionService.getSubmissions().subscribe((res) => {
      this.submissions = res;
    });
  }
}
