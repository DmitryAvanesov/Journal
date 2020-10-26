import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';

@NgModule({
  declarations: [ProfileComponent, DialogDeleteUserComponent],
  imports: [CommonModule, AngularMaterialModule, ProfileRoutingModule],
  exports: [ProfileComponent],
})
export class ProfileModule {}
