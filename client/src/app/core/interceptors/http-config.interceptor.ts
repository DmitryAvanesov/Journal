import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url !== 'http://localhost:3000/api/file/submission' &&
      request.url !== 'http://localhost:3000/api/image/upload' &&
      request.url !== 'http://localhost:3000/api/issue/cover'
    ) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    if (
      request.url !== 'http://localhost:3000/api/user/sign-up' &&
      request.url !== 'http://localhost:3000/api/user/log-in'
    ) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Token ${localStorage.getItem('journal-token')}`
        ),
      });
    }

    if (request.url.startsWith('http://localhost:3000/api/file/download')) {
      request = request.clone({
        responseType: 'arraybuffer',
      });
    }

    return next.handle(request);
  }
}
