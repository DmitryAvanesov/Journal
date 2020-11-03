import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpGuard } from 'src/app/core/guards/sign-up.guard';
import { SignUpComponent } from './sign-up.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent, canActivate: [SignUpGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}
