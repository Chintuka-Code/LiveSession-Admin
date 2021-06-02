import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ERROR_MESSAGE } from '../utilities/http_error_message';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor() {}

  handleError(err: HttpErrorResponse) {
    err['errorMessage'] = ERROR_MESSAGE(err.error.message, err);
    return throwError(err);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (!token) {
      return next.handle(request).pipe(catchError(this.handleError));
    }
    request = request.clone({
      setHeaders: {
        Authorization: token,
      },
    });
    retry(2);
    return next.handle(request).pipe(catchError(this.handleError));
  }
}
