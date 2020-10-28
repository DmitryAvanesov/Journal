import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileTitleComponent } from './profile-title/profile-title.component';

@NgModule({
  declarations: [ProfileComponent, DialogDeleteUserComponent, ProfileTitleComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ProfileRoutingModule,
    SharedModule,
  ],
  exports: [ProfileComponent],
})
export class ProfileModule {}
