import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { LoginService } from '../loginService/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  
  return loginService.isLoggedIn().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true; // ✅ User is authenticated
      } else {
        // 🔴 Redirect to error page with code 403 (Unauthorized)
        router.navigate(['/error'], { queryParams: { code: 403 } });
        return false;
      }
    }),
    catchError(() => {
      // 🔴 Redirect to error page with code 500 (Server error)
      router.navigate(['/error'], { queryParams: { code: 500 } });
      return of(false);
    })
  );
};
