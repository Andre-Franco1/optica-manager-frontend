import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const token = sessionStorage.getItem('auth-token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  const router = inject(Router);

  return next(req).pipe(
    catchError(err => {

      if (err.status === 401 || err.status === 403) {
        sessionStorage.removeItem('auth-token');
        router.navigate(['/login']);
      }

      return throwError(() => err);
    })
  );
};
