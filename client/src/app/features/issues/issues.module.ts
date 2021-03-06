import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssuesComponent } from './issues.component';
import { IssuesRoutingModule } from './issues-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [IssuesComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    IssuesRoutingModule,
    SharedModule,
  ],
  exports: [IssuesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IssuesModule {}
