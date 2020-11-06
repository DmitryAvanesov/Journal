import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueRoutingModule } from './issue-routing.module';
import { IssueComponent } from './issue.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [IssueComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    SharedModule,
    AngularMaterialModule,
  ],
  exports: [IssueComponent],
})
export class IssueModule {}
