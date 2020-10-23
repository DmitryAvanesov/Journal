import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionComponent } from './submission.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { SubmissionRoutingModule } from './submission-routing.module';

@NgModule({
  declarations: [SubmissionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MaterialFileInputModule,
    SubmissionRoutingModule,
  ],
  exports: [SubmissionComponent],
})
export class SubmissionModule {}
