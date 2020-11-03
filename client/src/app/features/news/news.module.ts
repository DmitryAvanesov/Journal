import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NewsComponent],
  imports: [CommonModule, NewsRoutingModule, SharedModule],
  exports: [NewsComponent],
})
export class NewsModule {}
