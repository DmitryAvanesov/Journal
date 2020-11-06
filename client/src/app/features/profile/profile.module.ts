import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileTitleComponent } from './profile-title/profile-title.component';
import { ProfileMySubmissionsComponent } from './profile-my-submissions/profile-my-submissions.component';
import { ProfileSubmissionsForReviewComponent } from './profile-submissions-for-review/profile-submissions-for-review.component';
import { ProfileSubmissionsForEditingComponent } from './profile-submissions-for-editing/profile-submissions-for-editing.component';
import { ProfileActionBlockComponent } from './profile-action-block/profile-action-block.component';

@NgModule({
  declarations: [
    ProfileComponent,
    DialogDeleteUserComponent,
    ProfileTitleComponent,
    ProfileMySubmissionsComponent,
    ProfileSubmissionsForReviewComponent,
    ProfileSubmissionsForEditingComponent,
    ProfileActionBlockComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ProfileRoutingModule,
    SharedModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
