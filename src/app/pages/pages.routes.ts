import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent, // ✅ Main layout wraps all child routes
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../pages/dashboard.component')
          .then(m => m.DashboardComponent) // ✅ Dashboard at /dashboard
      }
    ]
  }
];