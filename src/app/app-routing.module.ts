import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { RepeatAuthGuardService } from './guards/repeat-auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { IssuesComponent } from './issues/issues.component';
import { SubmissionComponent } from './submission/submission.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
  { path: 'home', component: HomeComponent },
  { path: 'issues', component: IssuesComponent },
  {
    path: 'submission',
    component: SubmissionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
