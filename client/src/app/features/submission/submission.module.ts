import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionComponent } from './submission.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  declarations: [SubmissionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MaterialFileInputModule,
  ],
  exports: [SubmissionComponent],
})
export class SubmissionModule {}
