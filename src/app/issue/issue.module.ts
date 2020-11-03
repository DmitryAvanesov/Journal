import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueRoutingModule } from './issue-routing.module';
import { IssueComponent } from './issue.component';
import { IssuesComponent } from '../issues/issues.component';

@NgModule({
  declarations: [IssueComponent],
  imports: [CommonModule, IssueRoutingModule],
  exports: [IssueComponent],
})
export class IssueModule {}
