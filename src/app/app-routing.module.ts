import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RepeatAuthGuardService } from './services/repeat-auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [RepeatAuthGuardService],
  },
  {
    path: 'log-in',
    component: LogInComponent,
    canActivate: [RepeatAuthGuardService],
  },
  { path: 'test', component: TestComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
