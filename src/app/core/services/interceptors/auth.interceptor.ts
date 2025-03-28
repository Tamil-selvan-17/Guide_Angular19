import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('userid');
 
  // Clone the request and add the Authorization header if token exists
  const modifiedReq = req.clone({
    withCredentials: true,
    setHeaders: token ? { 'Session-Key': token } : {} // Add header only if token exists
  });
 
  return next(modifiedReq);
};
