import { Routes } from '@angular/router';
import { authGuard } from './core/services/authguard/auth.guard';
import { ErrorComponent } from './auth/error/error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  // ✅ Ensures login page loads first
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component')
      .then(m => m.LoginComponent) // ✅ Ensure correct path for login component
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'Portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.component')
      .then(m => m.PortfolioComponent)
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.routes')
      .then(m => m.PAGES_ROUTES), 
      canActivate: [authGuard]// ✅ Ensure correct lazy-loaded routes ErrorComponent
  },
  { path: 'error', component: ErrorComponent },
  {
    path: '**',  // ✅ Catch-all unknown routes
    redirectTo: '/error?code=404'
  }
];
