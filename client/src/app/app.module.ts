import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpConfigInterceptor } from './core/interceptors/http-config.interceptor';
import { HomeModule } from './features/home/home.module';
import { IssuesModule } from './features/issues/issues.module';
import { LogInModule } from './features/log-in/log-in.module';
import { NewsModule } from './features/news/news.module';
import { ProfileModule } from './features/profile/profile.module';
import { PublishModule } from './features/publish/publish.module';
import { SignUpModule } from './features/sign-up/sign-up.module';
import { SubmissionModule } from './features/submission/submission.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorModule } from './features/error/error.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    IssuesModule,
    LogInModule,
    NewsModule,
    ProfileModule,
    PublishModule,
    SignUpModule,
    SubmissionModule,
    ErrorModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
