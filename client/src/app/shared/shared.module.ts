import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AngularMaterialModule } from '../angular-material.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeatureBlockComponent } from './feature-block/feature-block.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FeatureBlockComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FeatureBlockComponent,
    CardComponent,
  ],
})
export class SharedModule {}
