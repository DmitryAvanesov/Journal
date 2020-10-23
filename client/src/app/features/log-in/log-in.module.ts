import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../angular-material.module';
import { LogInRoutingModule } from './log-in-routing.module';

@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    LogInRoutingModule,
  ],
  exports: [LogInComponent],
})
export class LogInModule {}
