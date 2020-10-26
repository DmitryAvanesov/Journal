import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SignUpRoutingModule,
    SharedModule,
  ],
  exports: [SignUpComponent],
})
export class SignUpModule {}
