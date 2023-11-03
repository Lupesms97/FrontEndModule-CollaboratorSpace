import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ContentInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken('_tky-usr');
    const requestCopy = request.clone();
    if (token) {
      requestCopy.headers.set('Authorization', `Bearer ${token}`);
      requestCopy.headers.set('Content-Type', 'application/json');
    }
    return next.handle(requestCopy);
  }
}
