import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PublishGuard } from './core/guards/publish.guard';
import { RepeatAuthGuard } from './core/guards/repeat-auth.guard';
import { SignUpGuard } from './core/guards/sign-up.guard';
import { HomeComponent } from './features/home/home.component';
import { IssuesComponent } from './features/issues/issues.component';
import { LogInComponent } from './features/log-in/log-in.component';
import { NewsComponent } from './features/news/news.component';
import { ProfileComponent } from './features/profile/profile.component';
import { PublishComponent } from './features/publish/publish.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { SubmissionComponent } from './features/submission/submission.component';

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
