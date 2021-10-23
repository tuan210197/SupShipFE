import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const header = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "POST",

    });

    const newReq = req.clone({ headers: header });

    return next.handle(newReq).pipe(
      catchError(err => {
        console.error('lỗi rồi:');
       return throwError(err);
      })
    )
  }
}
