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
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardTitleComponent } from './card-title/card-title.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { CenteredContainerComponent } from './centered-container/centered-container.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    FeatureBlockComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    SubmitButtonComponent,
    CenteredContainerComponent,
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
    CardHeaderComponent,
    CardTitleComponent,
    SubmitButtonComponent,
    CenteredContainerComponent,
  ],
})
export class SharedModule {}
