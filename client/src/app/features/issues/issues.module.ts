import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesComponent } from './issues.component';

@NgModule({
  declarations: [IssuesComponent],
  imports: [CommonModule],
  exports: [IssuesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IssuesModule {}
