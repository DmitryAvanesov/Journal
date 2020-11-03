import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueRoutingModule } from './issue-routing.module';
import { IssueComponent } from './issue.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [IssueComponent],
  imports: [CommonModule, IssueRoutingModule, SharedModule],
  exports: [IssueComponent],
})
export class IssueModule {}
