import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/types/User';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';

@Component({
  selector: 'app-profile-action-block',
  templateUrl: './profile-action-block.component.html',
  styleUrls: ['./profile-action-block.component.scss'],
})
export class ProfileActionBlockComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  user: User | undefined;

  openDialog(): void {
    this.dialog.open(DialogDeleteUserComponent);
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe((user: User | undefined) => {
      this.user = user;
    });
  }
}
