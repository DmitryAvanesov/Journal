import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.scss'],
})
export class DialogDeleteUserComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteUserComponent>,
    private authenticationService: AuthenticationService
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  deleteUser(): void {
    this.dialogRef.close();

    this.authenticationService.deleteCurrent().subscribe(
      (_res) => {
        this.authenticationService.signOut();
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }
}
