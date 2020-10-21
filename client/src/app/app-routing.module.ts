import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { IssuesComponent } from './issues/issues.component';
import { SubmissionComponent } from './submission/submission.component';
import { ProfileComponent } from './profile/profile.component';
import { RepeatAuthGuard } from './guards/repeat-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { SignUpGuard } from './guards/sign-up.guard';
import { NewsComponent } from './news/news.component';
import { PublishComponent } from './publish/publish.component';
import { PublishGuard } from './guards/publish.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [SignUpGuard],
  },
  {
    path: 'log-in',
    component: LogInComponent,
    canActivate: [RepeatAuthGuard],
  },
  { path: 'home', component: HomeComponent },
  { path: 'issues', component: IssuesComponent },
  { path: 'news', component: NewsComponent },
  {
    path: 'submission',
    component: SubmissionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'publish',
    component: PublishComponent,
    canActivate: [PublishGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}