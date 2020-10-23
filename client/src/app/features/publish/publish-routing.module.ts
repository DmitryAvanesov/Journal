import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublishGuard } from 'src/app/core/guards/publish.guard';
import { PublishComponent } from './publish.component';

const routes: Routes = [
  { path: 'publish', component: PublishComponent, canActivate: [PublishGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishRoutingModule {}
