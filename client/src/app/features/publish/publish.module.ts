import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishComponent } from './publish.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PublishRoutingModule } from './publish-routing.module';

@NgModule({
  declarations: [PublishComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    PublishRoutingModule,
  ],
  exports: [PublishComponent],
})
export class PublishModule {}
