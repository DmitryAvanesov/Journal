import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepeatAuthGuard } from 'src/app/core/guards/repeat-auth.guard';
import { LogInComponent } from './log-in.component';

const routes: Routes = [
  { path: 'log-in', component: LogInComponent, canActivate: [RepeatAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogInRoutingModule {}
